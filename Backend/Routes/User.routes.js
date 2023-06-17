const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/User.model");
require("dotenv").config();

const saltRound = 4;

const userRoutes = express.Router();


// User Signup route
// METHOD: POST
// Request Object: expects user's name,email,password.
// Response: If signup successful send appropriate res regarding this.

userRoutes.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Checks for Email if it is already registered or not.
  const userEmail = await UserModel.findOne({ email });

  if (userEmail) {
    // If Email is already registered send this response to user.
    res.send({ message: "This Email is already registered" });
  } else {
    // if Email is not registered then we are 1st encrypting user's passwrod then saving into our database.
    try {
      bcrypt.hash(password, saltRound, async (err, myPassword) => {
        const user = new UserModel({ name, email, password: myPassword });
        await user.save();
        res.status(201).send({ message: "Signup Successfully" });
      });
    } catch (err) {
      console.log(err);
      res.send("Internal Server Error");
    }
  }
});


// User Login Route
// METHOD: POST
// Request Object: It expects user's email & password
// Response: If success send appropriate message.

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Checking if the entered Email is exist in database or not
    const user = await UserModel.findOne({ email });

    if (!user) {
      // If email not exist then this response will be sent to User
      return res.send({ message: "This Email is not Registered" });
    }
// If Email exist then it will compare the entered password with database password.
// - If password matches, return true else false.
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // here Excluding the Password field from object which will be sent to the user as response.
      const userInfo = { ...user.toObject(), password: undefined };
      // Generating a unique token for user side authentication.
      const token = jwt.sign(userInfo, process.env.secret_key, {
        expiresIn: "1d",
      });
      // Sending this response to user.
      res
        .status(201)
        .send({ token, user: userInfo, message: "Logged In successfully" });
    } else {
      // If email exist in databse and password not match theb this res will be send to user
      res.send({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.send("Internal Server Error");
  }
});

module.exports = { userRoutes };
