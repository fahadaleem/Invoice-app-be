const mongoose = require("mongoose");
const { productSchema } = require("../product/product");

const stockPurchaseSchema = new mongoose.Schema({
  purchase_date: {
    type: Date,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  total_bundle_cost: {
    type: Number, // Only for bundles
  },
  is_bundle: {
    type: Boolean,
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  supported_documents: [
    {
      type: String, // URL or path to the supporting document
    },
  ],
});

module.exports = mongoose.model("Stock", stockPurchaseSchema);
