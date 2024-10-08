const mongoose = require("mongoose");

const deliveryProductSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  selling_price: { type: Number, required: true }, // Selling price of the product
  quantity: { type: Number, required: true }, // Quantity of the product
  total_price: { type: Number }, // Total price will be calculated
});

const deliverySchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true }, // Customer reference
  created_at: {
    type: Date,
    default: Date.now, // Default to the current date
  },
  amount: {
    type: Number,
    required: true,
  },
  products: [deliveryProductSchema], // Use the separated product schema
});

Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
