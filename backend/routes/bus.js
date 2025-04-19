const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus");

// Create new bus
router.post("/add", async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    await newBus.save();
    res.status(201).json({ message: "Bus added successfully", bus: newBus });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all buses
router.get("/api/buses", async (req, res) => {
  const buses = await Bus.find();
  res.json(buses);
});

// Update bus
router.put("/api/buses/update/:id", async (req, res) => {
  await Bus.findByIdAndUpdate(req.params.id, req.body);
  res.send("Bus updated");
});

// Delete bus
router.delete("/api/buses/delete/:id", async (req, res) => {
  await Bus.findByIdAndDelete(req.params.id);
  res.send("Bus deleted");
});

module.exports = router;
