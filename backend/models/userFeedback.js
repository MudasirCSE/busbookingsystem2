const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var userFeedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
});

const userFeedback = mongoose.model("UserFeedback", userFeedSchema);

module.exports = userFeedback;