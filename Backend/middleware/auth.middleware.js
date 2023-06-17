const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  //Getting the token through req headers.
  const token = req.headers.authentication?.split(" ")[1];

  if (token) {
    // Verifying if the token is a valid token or not.
    const decoded = jwt.verify(
      token,
      process.env.secret_key,
      (err, decoded) => {
        if (decoded) {
          // If token is valid and the req url matches this condtion
        // - then it will add a new key as user_id to make relation with other collections 
          if (req.url === "/add/cart" || req.url === "/get/user/cart") {
            const user_id = decoded._id;
            req.body.user_id = user_id;
            console.log("userID", user_id);

            next();
          } else {
            next();
          }
        } else {
          // if token is not verified theb sends this response
          res.send({ message: "Please login first" });
        }
      }
    );
  } else {
    // If no token is send in headers then sends this response
    res.send({ message: "Please login first" });
  }
};

module.exports = { authentication };
