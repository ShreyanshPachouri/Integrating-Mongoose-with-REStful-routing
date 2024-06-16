const express = require('express');
const app = express();
const path = require('path')
const methodOverride = require('method-override');
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
const mongoose = require("mongoose")
const Product = require("./models/product")
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const categories = ["Fruit", "Vegetable", "Dairy"]

mongoose.connect('mongodb://localhost:27017/NewFarmStand', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

app.get('/products', async(req, res) => {
    const {category} = req.query

    if(category){
        const products = await Product.find({category})
        res.render('products/index', {products, category})
    } else{
        const products = await Product.find({})
        res.render('products/index', {products, category: "All"})
    }
    //The await(Product.find({})) line is used to find all the products. We are using async and await because it takes time to find all products.
})



app.get('/products/new', (req, res) => {
    res.render('products/new', {categories})
})

app.post('/products', async (req, res) => {
    const newProdcut = new Product(req.body)
    await newProdcut.save()
    res.redirect(`/products/${newProdcut._id}`)
})

app.get('/products/:id', async(req, res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    res.render("products/show", {product})
})

app.get('/products/:id/edit', async(req, res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    res.render("products/edit", {product, categories})
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params
    const editProduct = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    res.redirect(`/products/${editProduct._id}`)
})

app.delete('/products/:id', async(req, res) => {
    const {id} = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect("/products")
})
