const express = require("express");
const StockPurchase = require("../models/stock/stock");
const router = express.Router();

// POST route to handle new stock purchase
router.post("/stock", async (req, res) => {
  const {
    purchaseDate,
    paymentMethod,
    totalBundleCost,
    isBundle,
    items,
    supportingDocument,
  } = req.body;

  try {
    // Create a new stock purchase document
    const newStockPurchase = new StockPurchase({
      purchaseDate,
      paymentMethod,
      totalBundleCost: isBundle ? totalBundleCost : null,
      isBundle,
      items, // Array of item objects
      supportingDocument,
    });

    // Save to the database
    const savedStockPurchase = await newStockPurchase.save();
    res.status(201).json({
      message: "New stock added successfully.",
      data: savedStockPurchase,
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to create stock purchase",
      message: error.message,
    });
  }
});

module.exports = router;
