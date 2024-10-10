const Expense = require("../models/expense/expense");
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
