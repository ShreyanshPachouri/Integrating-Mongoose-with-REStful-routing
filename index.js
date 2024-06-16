const express = require('express');
const app = express();
const path = require('path')
const methodOverride = require('method-override');
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')// To 'fake' put/patch/delete requests:
const mongoose = require("mongoose")
const Product = require("./models/product")
app.use(express.urlencoded({extended: true})) //This is used to extract data from the body of the post request which is in readable form
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

// This shows all products
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

//This renders a form where we type our new comment
app.get('/products/new', (req, res) => {
    res.render('products/new', {categories})
})

//This is where the data of the form is submitted
app.post('/products', async (req, res) => {
    const newProdcut = new Product(req.body)//req.params will not be used here because this is a post request. req.params is used for get request. The username and comment will be parsed from the post request received from the form.
    await newProdcut.save()
    res.redirect(`/products/${newProdcut._id}`)//res.redirect is used because when we refresh the page, another post request will be sent and another new comment with the same content will be added
})

app.get('/products/:id', async(req, res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    res.render("products/show", {product: product}) //The {product: product} thing is a key-value pair. The variable product will be referred to as product in the show.ejs page that we are creating.
})

app.get('/products/:id/edit', async(req, res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    res.render("products/edit", {product, categories})
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params
    const editProduct = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    res.redirect(`/products/${editProduct._id}`) //If the request is anything other than a get request, you use res.redirect() to redirect the user to the main page
})

app.delete('/products/:id', async(req, res) => {
    const {id} = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect("/products")
})
