const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  btype: {
    type: String,
    required: true,
  },
  bnumber: {
    type: String,
    required: true,
    unique: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  arrtime: {
    type: String,
    required: true,
  },
  deptime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
