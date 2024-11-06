const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  byUser: { type: mongoose.Types.ObjectId, ref: "User" },
  originalname: { type: String, required: true },
  path: { type: String, required: true },
  filename: { type: String, required: true },
  size: { type: Number, required: true },
  encoding: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});
const UserProfile = mongoose.model("UserProfile", fileSchema);

module.exports = { UserProfile };
