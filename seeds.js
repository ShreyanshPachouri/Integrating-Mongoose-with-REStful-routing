const mongoose = require("mongoose")
const Product = require("./models/product")

mongoose.connect('mongodb://localhost:27017/NewFarmStand', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
})

// const p = new Product({
//          name: 'Potato',
//         price: 1.99,
//         category: 'fruit'
//      })
//     p.save()
//          .then(p => {
//              console.log(p)
//          })
//          .catch(e => {
//              console.log(e)
//          })
    

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: "Vegetable"
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: "Fruit"
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: "Fruit"
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: "Vegetable"
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: "Dairy"
    },
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
