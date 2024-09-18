const Delivery = require("../models/delivery/delivery");
const express = require("express");

const router = express.Router();

// router.get("/delivery/:id", async (req, res, next) => {
//   try {
//     const customers = await Customer.find(); // Fetch all customers from the database

//     res.status(200).json({
//       status: "success",
//       data: customers,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: "Failed to retrieve customers.",
//     });
//     next(err); // Pass the error to the error handler
//   }
// });

router.post("/delivery", async (req, res, next) => {
  try {
    const { customer_id, generated_by, products, subtotal, payment_status } =
      req.body;

    // Create the delivery note
    const deliveryNote = await Delivery.create({
      customer_id,
      generated_by,
      products,
      subtotal,
      payment_status,
      date: new Date(), // Automatically set the current date
    });

    res.status(200).json({
      status: "success",
      message: "Delivery note added successfully.",
      data: deliveryNote,
    });
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
});

module.exports = router;
