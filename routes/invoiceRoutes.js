const Invoice = require("../models/invoice/invoice");
const Account = require("../models/account/account");
const express = require("express");

const router = express.Router();

router.post("/invoices", async (req, res, next) => {
  try {
    const { customer, products, amount, status } = req.body;

    // Create a new invoice
    const newInvoice = new Invoice({
      customer,
      products,
      amount,
      status,
    });

    // Save the invoice to the database
    await newInvoice.save();

    // Send a response
    res.status(201).json({
      message: "Invoice created successfully",
      data: newInvoice,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
});

// GET route to fetch all invoices
router.get("/invoices", async (req, res, next) => {
  try {
    // Fetch all invoices from the database
    const invoices = await Invoice.find().populate("customer").populate("products.product"); // Optionally populate customer details

    // Send a response with the fetched invoices
    res.status(200).json({
      message: "Invoices fetched successfully",
      data: invoices,
      status: "success",
    });
  } catch (error) {
    next(error); // Pass error to the global error handler
  }
});

router.delete("/invoices/:invoiceId", async (req, res, next) => {
  try {
    const { invoiceId } = req.params; // Get the invoiceId from request parameters

    // Find the invoice by ID and delete it
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);

    if (!deletedInvoice) {
      return res.status(404).json({
        message: "Invoice not found",
        status: "error",
      });
    }

    // Respond with a success message
    res.status(200).json({
      message: "Invoice deleted successfully",
      status: "success",
    });
  } catch (error) {
    next(error); // Pass any errors to the error handler middleware
  }
});

// GET route to fetch a specific invoice by ID
router.get("/invoices/:invoiceId", async (req, res, next) => {
  try {
    const { invoiceId } = req.params;

    // Find the invoice by its ID and populate customer and products details
    const invoice = await Invoice.findById(invoiceId)
      .populate("customer") // Populate customer details
      .populate("products.product"); // Populate product details

    // Send the fetched invoice details
    res.status(200).json({
      message: "Invoice fetched successfully",
      data: invoice,
      status: "success",
    });
  } catch (error) {
    next(error); // Pass error to the global error handler
  }
});

// PUT route to update invoice details
router.put("/invoices/:invoiceId", async (req, res, next) => {
  try {
    const { invoiceId } = req.params; // Get the invoiceId from request parameters
    const { customer, products, amount, status } = req.body; // Extract fields to update

    // Find the invoice by ID and update it
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      { customer, products, amount, status },
      { new: true, runValidators: true } // Options to return the updated document and run validators
    )
      .populate("customer") // Populate customer details
      .populate("products.product"); // Populate product details

    // Check if the invoice was found and updated
    if (!updatedInvoice) {
      return res.status(404).json({
        message: "Invoice not found",
        status: "error",
      });
    }

    // Now, push the expense into the Account collection as an Expense
    const newExpenseEntry = new Account({
      type: "income", // Since it's an expense
      amount: amount, // Use the same amount
      description: `Amount received from ${updatedInvoice.customer.name}`, // You can use 'reason' for the description
    });
    await newExpenseEntry.save();

    // Respond with the updated invoice
    res.status(200).json({
      message: "Invoice updated successfully",
      data: updatedInvoice,
      status: "success",
    });
  } catch (error) {
    next(error); // Pass error to the global error handler
  }
});

module.exports = router;
