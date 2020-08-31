const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentEmail: { type: String, required: true },
  isSuspended: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("students", studentSchema);
