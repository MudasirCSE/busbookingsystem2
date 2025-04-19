const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Make sure path is correct

// Add a ticket to a user
router.post("/add-ticket", async (req, res) => {
  const { userId, name, email, phone, address, from, to, date, seatNo } =
    req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const newTicket = {
      name,
      email,
      phone,
      address,
      from,
      to,
      date,
      seatNo, // string like "1,2,3"
    };

    user.ticketInfo.push(newTicket);
    await user.save();

    res
      .status(201)
      .json({ msg: "Ticket added successfully!", ticket: newTicket });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

// Example: GET /user/tickets/:userId
router.get("/tickets/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user.ticketInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find(); // this includes ticketInfo by default
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a ticket from a specific user
router.delete("/:userId/ticket/:ticketId", async (req, res) => {
  const { userId, ticketId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Remove the ticket with the given ticketId
    user.ticketInfo = user.ticketInfo.filter(
      (ticket) => ticket._id.toString() !== ticketId
    );

    await user.save();
    res.json({ msg: "Ticket deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Update a ticket
router.put("/:userId/ticket/:ticketId", async (req, res) => {
  const { userId, ticketId } = req.params;
  const updatedTicket = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const ticketIndex = user.ticketInfo.findIndex(
      (ticket) => ticket._id.toString() === ticketId
    );

    if (ticketIndex === -1)
      return res.status(404).json({ msg: "Ticket not found" });

    user.ticketInfo[ticketIndex] = updatedTicket;

    await user.save();
    res.json({ msg: "Ticket updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
