const mongoose = require("mongoose");
// Define a schema
const servicesSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  desc: { type: String, require: true },
  createdDate: { type: Date, default: Date.now() },
});
// Create a model
const Services = mongoose.model("Services", servicesSchema);
module.exports = Services;
