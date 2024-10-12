const Expense = require("../models/expense/expense");
const Account = require("../models/account/account");
const express = require("express");

const router = express.Router();

router.post("/expenses", async (req, res, next) => {
  try {
    const { expense_date, entry_date, amount, reason, additional_info, supported_documents } = req.body;

    const newExpense = new Expense({
      expense_date,
      entry_date,
      amount,
      reason,
      additional_info,
      supported_documents,
    });

    const savedExpense = await newExpense.save();

    // Now, push the expense into the Account collection as an Expense
    const newExpenseEntry = new Account({
      type: "expense", // Since it's an expense
      amount: amount, // Use the same amount
      description: reason, // You can use 'reason' for the description
    });
    await newExpenseEntry.save();

    res.status(201).json({
      status: "success",
      data: savedExpense,
      message: "Expense added successfully",
    });
  } catch (err) {
    next({
      status: "error",
      message: "Failed to add expense.",
    });
  }
});

module.exports = router;
