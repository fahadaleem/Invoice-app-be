const Product = require("../models/product/product");
const express = require("express");

const router = express.Router();

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find(); // Fetch all customers from the database

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve products.",
    });
    next(err); // Pass the error to the error handler
  }
});

router.post("/products", async (req, res, next) => {
  try {
    const { name, price, available_stocks } = req.body;

    await Product.create({
      name,
      price,
      available_stocks,
    });

    res.status(200).json({
      status: "success",
      message: "Product added successfully.",
    });
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
});

router.get("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params; // Extract the id from the request parameters
    const product = await Product.findById(id); // Find customer by ID

    if (!product) {
      // If no customer is found, send a 404 response
      return res.status(404).json({
        status: "error",
        message: "Product not found.",
      });
    }

    // If the customer is found, return the customer data
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    next({
      status: error,
      message: "Failed to retrieve product.",
    });
  }
});

module.exports = router;
