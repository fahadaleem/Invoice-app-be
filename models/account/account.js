const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["expense", "income"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  supported_documents: [
    {
      type: String, // URL or path to the supporting document
    },
  ],
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
