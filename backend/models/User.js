const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the buyer
  email: { type: String, required: true }, // Buyer's email
  phone: { type: String, required: true }, // Buyer's phone number
  address: { type: String, required: true }, // Buyer's address
  from: { type: String, required: true }, // Departure city
  to: { type: String, required: true }, // Arrival city
  date: { type: Date, required: true }, // Travel date
  seatNo: { type: String, required: false }, // Comma-separated seat numbers (e.g., "1,2,3")
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ticketInfo: {
    type: [ticketSchema],
    default: [], // Allows registration without tickets
  },
});

module.exports = mongoose.model("User", UserSchema);
