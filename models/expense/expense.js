const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  expense_date: {
    type: Date,
    required: true,
  },
  entry_date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  additional_info: {
    type: String,
  },
  supported_documents: [{ type: String }],
});

module.exports = mongoose.model("Expense", expenseSchema);
