const Customer = require("../models/customer/customer");
const express = require("express");

const router = express.Router();

router.get("/customers", async (req, res, next) => {
  try {
    const customers = await Customer.find(); // Fetch all customers from the database
    res.status(200).json({
      status: "success",
      data: customers,
    });
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
});

router.post("/customers", async (req, res, next) => {
  try {
    const { name, phone_no, email, address } = req.body;
    // Check if the customer already exist exists
    const existingCusomter = await Customer.findOne({ email });
    if (existingCusomter) {
      next({
        code: 409,
        message: "This customer is already exists",
      });
      return;
    }

    await Customer.create({
      name,
      phone_no,
      email,
      address,
    });

    res.status(200).json({
      status: "success",
      message: "Customer added successfully.",
    });
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
});

router.get("/customers/:id", async (req, res, next) => {
  try {
    const { id } = req.params; // Extract the id from the request parameters
    const customer = await Customer.findById(id); // Find customer by ID

    if (!customer) {
      // If no customer is found, send a 404 response
      res.status(404).json({
        status: "error",
        message: "Customer not found.",
      });
      return;
    }

    // If the customer is found, return the customer data
    res.status(200).json({
      status: "success",
      data: customer,
    });
  } catch (err) {
    next({
      status: error,
      message: "Failed to retrieve customer.",
    });
  }
});

module.exports = router;
