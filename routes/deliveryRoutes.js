const Delivery = require("../models/delivery/delivery");
const express = require("express");

const router = express.Router();

router.get("/delivery/:id", async (req, res, next) => {
  try {
    const deliveryId = req.params.id;

    // Fetch the delivery note by ID
    const deliveryNote = await Delivery.findById(deliveryId);

    // If no delivery note is found, send a 404 response
    if (!deliveryNote) {
      return res.status(404).json({
        status: "error",
        message: "Delivery note not found.",
      });
    }

    // If found, return the delivery note data
    res.status(200).json({
      status: "success",
      message: "Delivery note retrieved successfully.",
      data: deliveryNote,
    });
  } catch (err) {
    console.log(err);
    next(err); // Pass the error to the error handler
  }
});

router.post("/deliveries", async (req, res, next) => {
  try {
    const { customer, products, amount } = req.body;

    // Create the delivery note
    const deliveryNote = await Delivery.create({
      customer,
      products,
      amount,
    });

    res.status(200).json({
      status: "success",
      message: "Delivery note added successfully.",
      data: deliveryNote,
    });
  } catch (err) {
    console.log(err);
    next(err); // Pass the error to the error handler
  }
});

module.exports = router;
