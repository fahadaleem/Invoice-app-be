const Invoice = require("../models/invoice/invoice");
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

module.exports = router;
