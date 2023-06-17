const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: String,
    image_url: String,
    brand: String,
    category: String,
    subCategory: String,
    searchBy: String,
    quantity: Number,
    price: Number
},{
    versionKey:false
})


const ProductsModel = mongoose.model("products", productSchema);


module.exports = { ProductsModel };