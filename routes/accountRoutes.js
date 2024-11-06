const express = require("express");
const Account = require("../models/account/account");

const router = express.Router();

router.get("/accounts", async (req, res, next) => {
  try {
    const accounts = await Account.find().sort({ date: -1 });

    const accountSummary = {
      total_income: 0,
      total_expense: 0,
      transactions: accounts,
    };

    accounts.forEach((account) => {
      if (account.type === "income") {
        accountSummary.total_income += account.amount;
      } else if (account.type === "expense") {
        accountSummary.total_expense += account.amount;
      }
    });

    res.status(200).json({
      status: "success",
      data: accountSummary,
      message: "Accounts retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
});

// Add this to your existing API file
router.put("/accounts/:id", async (req, res, next) => {
  const { id } = req.params;
  const { type, date, amount, description, supported_documents } = req.body;

  try {
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      {
        type,
        date,
        amount,
        description,
        supported_documents,
      },
      { new: true, runValidators: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({
        status: "fail",
        message: "Account not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedAccount,
      message: "Account updated successfully",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
