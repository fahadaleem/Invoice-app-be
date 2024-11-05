const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost_price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
  min_market_value: {
    type: Number,
  },
  purchase_date: {
    type: Date,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, productSchema };
