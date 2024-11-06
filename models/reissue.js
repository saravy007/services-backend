const mongoose = require("mongoose");
// Define a schema
const reissueSchema = new mongoose.Schema({
  reissue_attach1: { type: String },
  reissue_attach2: { type: String },
  reissue_attach3: { type: String },
  reissue_attach4: { type: String },
  createdDate: { type: Date, default: Date.now() },
});
// Create a model
const Reissue = mongoose.model("reissue", reissueSchema);
module.exports = Reissue;
