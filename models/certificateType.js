const mongoose = require("mongoose");
// Define a schema
const certificateTypeSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  desc: { type: String, require: true },
  createdDate: { type: Date, default: Date.now() },
});
// Create a model
const CertificateType = mongoose.model(
  "CertificateType",
  certificateTypeSchema
);
module.exports = CertificateType;
