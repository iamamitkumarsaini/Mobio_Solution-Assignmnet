const mongoose = require("mongoose");

const productCartSchema = mongoose.Schema({
    user_id: String,
    product_id: String,
    title: String,
    image_url: String,
    brand: String,
    subCategory: String,
    quantity: Number,
    price: Number
},{
    versionKey:false
})


const ProductCartModel = mongoose.model("usercart", productCartSchema);


module.exports = { ProductCartModel };