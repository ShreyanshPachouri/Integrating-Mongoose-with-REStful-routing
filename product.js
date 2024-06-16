const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: String,
        enum: ["Fruit", "Vegetable", "Dairy"]
    }
//This is a javaScript object. The keys in this object(name, price, category) will be used as keys for storing data in the Mongo database. Here we are defining that the data returned from the database should be of a specific type. For example, name should be a string, price should be a number etc.
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product
