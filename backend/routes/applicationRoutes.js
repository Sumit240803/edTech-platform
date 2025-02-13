const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const { auth } = require("../middleware/authMiddleware");


// 🟢 Student submits an application
router.post("/apply",auth, async (req, res) => {
  try {
    const { course } = req.body;
    const application = new Application({ studentId: req.user.id, course });
    await application.save();
    res.json({ message: "Application submitted!", application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Agent reviews pending applications
router.get("/pending", auth, async (req, res) => {
  try {
    const applications = await Application.find({ status: "Pending" }).populate("studentId", "name email");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Agent/Admin updates application status
router.put("/update/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedApp = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ message: "Application updated!", updatedApp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Student checks their applications
router.get("/my-applications", auth, async (req, res) => {
  try {
    const applications = await Application.find({ studentId: req.user.id });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
