const mongoose = require("mongoose");

const stockItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  minMarketValue: {
    type: Number,
    required: true,
  },
  estimateCostPrice: {
    type: Number, // Only required for bundle
  },
  costPerUnit: {
    type: Number, // Only required for non-bundle
  },
});

const stockPurchaseSchema = new mongoose.Schema({
  purchaseDate: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  totalBundleCost: {
    type: Number, // Only for bundles
  },
  isBundle: {
    type: Boolean,
    required: true,
  },
  items: [stockItemSchema], // Array of items
  supportingDocument: {
    type: String, // URL or path to the supporting document
  },
});

module.exports = mongoose.model("Stock", stockPurchaseSchema);
