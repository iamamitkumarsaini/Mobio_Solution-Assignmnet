const express = require("express");
const { ProductCartModel } = require("../Model/Usercart.model");

const cartRoute = express.Router();

cartRoute.post("/add/cart", async (req, res) => {
  const payload = req.body;

  try {
    const cartProducts = new ProductCartModel(payload);
    await cartProducts.save();
    res.status(201).send({ message: "Added to Cart" });
  } catch (err) {
    console.log(err);
    res.send("Internal Server Error");
  }
});

cartRoute.get("/get/user/cart", async (req, res) => {
  const { user_id } = req.body;

  try {
    const cartProducts = await ProductCartModel.find({ user_id });
    res.status(200).send(cartProducts);
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal Server Error" });
  }
});

cartRoute.patch("/update/cart/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const cartUpdate = await ProductCartModel.findByIdAndUpdate(id, payload);
    res.status(201).send({ message: "Quantity updated" });
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal Server Error" });
  }
});

cartRoute.delete("/delete/cart/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await ProductCartModel.findByIdAndDelete(id);
    res.status(201).send({ message: "Item removed from Cart" });
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal Server Error" });
  }
});

cartRoute.delete("/place/order/:id", async (req, res) => {
  const user_id = req.params.id;

  try {
    await ProductCartModel.deleteMany({ user_id });
    res.status(201).send({ message: "Order Placed Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal Server Error" });
  }
});

module.exports = { cartRoute };
