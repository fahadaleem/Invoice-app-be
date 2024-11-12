const express = require("express");
const Stocks = require("../models/stocks/stocks");
const Account = require("../models/account/account");
const { Product } = require("../models/product/product");
const router = express.Router();

// POST route to handle new stock purchase
router.post("/stocks", async (req, res, next) => {
  const { purchase_date, payment_method, total_bundle_cost, is_bundle, products, supported_documents } = req.body;

  try {
    // add products in the databases
    const savedProducts = await Product.insertMany(products);
    // Extract product IDs from the saved products
    const productIds = savedProducts.map((product) => product._id);

    // Create a new stock purchase document
    const newStockPurchase = new Stocks({
      purchase_date,
      payment_method,
      total_bundle_cost: is_bundle ? total_bundle_cost : null,
      total_bundle_cost,
      is_bundle,
      products: productIds,
      supported_documents,
    });

    // calculating total cost from product if the purchase item is individual

    //  Save to the database
    const savedStockPurchase = await newStockPurchase.save();

    // Now, push the expense into the Account collection as an Expense
    const newExpenseEntry = new Account({
      type: "expense", // Since it's an expense
      amount: is_bundle
        ? total_bundle_cost
        : products.reduce((accumulator, product) => {
            return accumulator + product.cost_price * product.quantity;
          }, 0), // Use the same amount
      description: "Stock Purchased", // You can use 'reason' for the description,
      supported_documents: supported_documents,
    });

    await newExpenseEntry.save();

    res.status(201).json({
      message: "New stock added successfully.",
      data: savedStockPurchase,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next({
      code: 400,
      message: "Failed to create stock purchase",
    });
  }
});

module.exports = router;
