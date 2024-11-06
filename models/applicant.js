const mongoose = require("mongoose");
require("../models/verify");
require("../models/edit");
require("../models/reissue");
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
  service: {
    type: String,
    required: true,
    enum: ["verify", "edit", "reissue"],
  },
  serviceTake: { type: mongoose.Types.ObjectId, refPath: "service" },
  status: { type: Number, default: 1 },
  createdDate: { type: Date, default: Date.now() },
});
// Create a model
const Applicant = mongoose.model("Applicant", applicantSchema);
module.exports = Applicant;
