const mongoose = require("mongoose");
// Define a schema
const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  dob: { type: Date },
  phone: { type: String, require: true },
  address: { type: String },
  email: { type: String, unique: true },
  password: { type: String, require: true },
  role: {
    type: String,
    enum: ["user", "front", "admin"],
    default: "user",
  },
  createdDate: { type: Date, default: Date.now() },
});
// Create a model
const User = mongoose.model("User", userSchema);
module.exports = User;
