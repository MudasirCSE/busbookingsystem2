const express = require("express");
const router = express.Router();
const User = require("../models/User");
const userFeedback = require("../models/userFeedback")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/adminLogin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });
    if (!admin) return res.json({ success: false, message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid credentials" })

    const adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "2d"
    });
    return res.json({
      success: true,
      adminToken,
      admin: { adminId: admin._id, adminUsername: admin.username, adminEmail: admin.email },
      adminId: admin._id
    })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
})

// User FeedBack:
router.post("/feedback", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // We Check that is there is same User who submit form again:
    const existingMessage = await userFeedback.findOne({ message });
    if (existingMessage) {
      return res.json({ success: false, message: "Your message already recieved thanks..." })
    }
    const feedback = new userFeedback({
      name: name,
      email: email,
      message: message
    })
    await feedback.save();
    return res.json({ success: true, message: "Thank you for contacting us" })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
})
module.exports = router;
