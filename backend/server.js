const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/", require("./routes/ticket"));
app.use("/api/buses", require("./routes/bus"));

app.get("/", (req, res) => {
  res.send("Hello,this is backend")
})
// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  })
  .catch((err) => console.log(err));
