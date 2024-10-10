const mongoose = require("mongoose");

const invoiceProductSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  selling_price: { type: Number, required: true }, // Selling price of the product
  quantity: { type: Number, required: true }, // Quantity of the product
  total_price: { type: Number }, // Total price will be calculated
});

const invoiceSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true }, // Customer reference
  created_at: {
    type: Date,
    default: Date.now, // Default to the current date
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  products: [invoiceProductSchema], // Use the separated product schema
});

module.exports = mongoose.model("Invoice", invoiceSchema);
