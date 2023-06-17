const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { userRoutes } = require("./Routes/User.routes");
const { connection } = require("./config/db");
const { authentication } = require("./middleware/auth.middleware");
const { productsRoute } = require("./Routes/Products.route");
const { cartRoute } = require("./Routes/Usercart.route");


const app = express();

app.use(cors({
    origin:"*"
}));

app.use(express.json());


app.get("/", (req,res) => {
    
    res.status(200).send({"message": "Welcome to Mobio Solution"});
})

app.use("/", userRoutes)
app.use("/", productsRoute);

app.use(authentication);
app.use("/", cartRoute);



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