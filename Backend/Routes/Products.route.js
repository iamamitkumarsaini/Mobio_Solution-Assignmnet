const express = require("express");
const { ProductsModel } = require("../Model/Product.model");

// Creating an instance of the Express Router
const productsRoute = express.Router();


// Route for adding products. If a seller wants to add new products.
// METHOD: POST
// Request Object expects all necessary products Details
// Response: Send a response with a message that Product is added to database.
productsRoute.post("/add/products", async (req, res) => {
  const payload = req.body;

  try {
    const products = new ProductsModel(payload);
    await products.save();
    res.status(201).send({ message: "Products Added Successfully" });
  } catch (err) {
    console.log(err);
    res.send("Internal Server Error");
  }
});


// Route for retrieving products
// METHOD: GET
// Send all the products with pagination and has default limit of 12 items per page
// Also used Aggregation pipeline for searching and sorting functionality
productsRoute.get("/products", async (req, res) => {
  try {
    const { page = 1, search = "", sort = "" } = req.query;

    const pipeline = [];

    if (search) {
      // using Regular Expression for searching a product from database with $match query.
      const searchStage = {
        $match: {
          $or: [
            { title: { $regex: new RegExp(search, "i") } },
            { brand: { $regex: new RegExp(search, "i") } },
            { category: { $regex: new RegExp(search, "i") } },
            { subCategory: { $regex: new RegExp(search, "i") } },
            { searchBy: { $regex: new RegExp(search, "i") } },
          ],
        },
      };
      pipeline.push(searchStage);
    }

    if (sort) {
      // sorting all the products according to the sort variable's value.
      const sortStage = {
        $sort: { [sort]: 1 },
      };
      pipeline.push(sortStage);
    }

    const totalCountPipeline = [...pipeline];
    totalCountPipeline.push({ $count: "totalCount" });

    // Applying pagination and limit per page functionality.
    pipeline.push({ $skip: (page - 1) * 10 }, { $limit: 12 });

    const [products, totalCount] = await Promise.all([
      // using aggregate method from mongodb
      ProductsModel.aggregate(pipeline),
      ProductsModel.aggregate(totalCountPipeline),
    ]);

    res
      .status(200)
      .send({ products, totalCount: totalCount[0]?.totalCount || 0 });
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal Server Error" });
  }
});

module.exports = { productsRoute };
