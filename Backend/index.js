const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { userRoutes } = require("./Routes/User.routes");
const { connection } = require("./config/db");
const { authentication } = require("./middleware/auth.middleware");
const { productsRoute } = require("./Routes/Products.route");
const { cartRoute } = require("./Routes/Usercart.route");


const app = express();

// Using cors as middleware for allowing the cross origin access.
app.use(cors({
    origin:"*"
}));

// Parsing request body as JSON
app.use(express.json());

// Default route
app.get("/", (req,res) => {
    
    res.status(200).send({"message": "Welcome to Mobio Solution"});
})

// User login and signup routes
app.use("/", userRoutes)

// Products routes for retriving all products with any additional varification
app.use("/", productsRoute);

// Using middleware for private routes. If no valid token provided then the req cannot be made to the desired route
app.use(authentication);

// user Cart and order route.
app.use("/", cartRoute);


// listening server on a port
app.listen(process.env.port, async(req,res) => {

    try {
        await connection;
        console.log("Connection to DB Successful")
    } 
    
    catch (err) {
        console.log("Connection to DB failed");
        console.log(err);
    }
})
