const express = require("express");
const { ProductCartModel } = require("../Model/Usercart.model");

const cartRoute = express.Router();

// Route for adding items to user's cart.
// METHOD: POST
// Whatever Items the user adds will be saved in Usercart Collection.
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


// Sending all the items back to the user which he added to the cart.
// Request: adding a user_id via middleware to identify the user-specific items from the collection
// Response: All the items of that particular user.
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


// Route for Updating the Quantity.
//In cart-page if a user updates the quantity of the products that req will be made here.
// Request Object: Updated quantity of item, and item id as params
// Response: response consist a message denoting that quantity is updated
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


// delete Req if a user make any items quantity as 0 in cart page
// Request Object: expects that item's id as params
// Response: Sends message that it is removed from the cart.
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


// Once the user clicks on the 'Place order' button. deleting all the items from the Usercart collection.
// Request: It expects a user_id which is common in all items.
// Response: sends a message to the user telling him that the order is Successful.
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
