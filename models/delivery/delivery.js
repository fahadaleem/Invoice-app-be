const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  customer_id: {
    type: String,
    required: true,
  },
  generated_by: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      product_id: {
        type: String,
        required: true,
      },
      product_name: {
        type: String,
        required: true,
      },
      cost_price: {
        type: Number,
        required: true,
      },
      selling_price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      total_amount: {
        type: Number,
        required: true,
      },
    },
  ],
  subtotal: {
    type: Number,
    required: true,
  },
  payment_status: {
    type: String,
    required: true,
  },
});

Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
