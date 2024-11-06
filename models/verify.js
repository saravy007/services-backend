const mongoose = require("mongoose");
// Define a schema
const verifySchema = new mongoose.Schema({
  verifyByCertType: {
    type: String,
    require: true,
    enum: ["diploma", "temp_cert", "graduate_cert"],
  },
  verify_attach1: { type: String },
  createdDate: { type: Date, default: Date.now() },
});
// Create a model
const Verify = mongoose.model("verify", verifySchema);
module.exports = Verify;
