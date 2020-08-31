const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  teacherId: { type: String, required: true },
  teacherEmail: { type: String, required: true },
  students: [{}],
});

module.exports = mongoose.model("teachers", teacherSchema);
