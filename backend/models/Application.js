const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["Pending", "Reviewed", "Accepted", "Rejected"], default: "Pending" },
  course: { type: String, required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", applicationSchema);
