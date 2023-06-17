const express = require("express");
const { ProductsModel } = require("../Model/Product.model");

const productsRoute = express.Router();


productsRoute.post("/add/products", async(req,res) => {

    const payload = req.body;

    try {
        const products = new ProductsModel(payload);
        await products.save()
        res.status(201).send({message: "Products Added Successfully"});
    } 
    
    catch (err) {
        console.log(err);
        res.send("Internal Server Error");
    }
});



productsRoute.get("/products", async (req, res) => {
    try {
      const { page = 1, search = "", sort = "" } = req.query;
  
      const pipeline = [];
  
      if (search) {
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
        const sortStage = {
            $sort: { [sort]: 1 },
        };
        pipeline.push(sortStage);
      }
  
      const totalCountPipeline = [...pipeline]; 
      totalCountPipeline.push({ $count: "totalCount" }); 
  
      pipeline.push(
        { $skip: (page - 1) * 10 },
        { $limit: 12 }
      );
  
      const [products, totalCount] = await Promise.all([
        ProductsModel.aggregate(pipeline),
        ProductsModel.aggregate(totalCountPipeline)
      ]);
  
      res.status(200).send({ products, totalCount: totalCount[0]?.totalCount || 0 });
  
    } 
    
    catch (err) {
      console.log(err);
      res.send({ message: "Internal Server Error" });
    }
  });



module.exports = { productsRoute }