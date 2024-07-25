const mongoose = require("mongoose");
// Define a schema
const applicantSchema = new mongoose.Schema({
  byUser: { type: mongoose.Types.ObjectId, ref: "User" },
  name: { type: String, require: true },
  gender: { type: String, require: true },
  dob: { type: Date, require: true },
  address: { type: String },
  examDate: { type: Date, require: true },
  examCenter: { type: String },
  room: { type: Number },
  seat: { type: Number },
  grade: { type: String },
  phone: { type: String },
  createdDate: { type: Date, default: Date.now() },
});
// Create a model
const Applicant = mongoose.model("Applicant", applicantSchema);
module.exports = Applicant;
