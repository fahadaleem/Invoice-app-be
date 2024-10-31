const Customer = require("../models/customer/customer");
const express = require("express");

const router = express.Router();

// GET /customers - Fetch customers with pagination
router.get("/customers", async (req, res, next) => {
  try {
    // Get the page and limit query parameters, default to page 1 and limit 10
    const { page = 1, limit = 10 } = req.query;

    // Convert page and limit to integers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Calculate the number of documents to skip
    const skip = (pageNum - 1) * limitNum;

    // Fetch the customers with pagination
    const customers = await Customer.find().skip(skip).limit(limitNum);

    // Fetch total number of customers to calculate total pages
    const totalCustomers = await Customer.countDocuments();

    res.status(200).json({
      status: "success",
      data: {
        customers,
        total_pages: Math.ceil(totalCustomers / limitNum),
        current_page: pageNum,
        total_customers: totalCustomers,
      },
    });
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
});

router.post("/customers", async (req, res, next) => {
  try {
    const { name, email, phone_no, customer_registeration_number, city, address } = req.body;

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
      customer_registeration_number,
      city,
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

// DELETE customer by ID
router.delete("/customers/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the customer by ID and remove them
    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      // If no customer is found, send a 404 response
      res.status(404).json({
        status: "error",
        message: "Customer not found.",
      });
      return;
    }

    // Send a success message if customer is deleted
    res.status(200).json({
      status: "success",
      message: "Customer deleted successfully.",
    });
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
});

module.exports = router;
