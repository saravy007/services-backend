const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  byUser: { type: mongoose.Types.ObjectId, ref: "User" },
  byform: { type: mongoose.Types.ObjectId, ref: "form" },
  originalname: { type: String, required: true },
  path: { type: String, required: true },
  filename: { type: String, required: true },
  size: { type: Number, required: true },
  encoding: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});
const FileAttach = mongoose.model("FileAttach", fileSchema);

module.exports = { FileAttach };
