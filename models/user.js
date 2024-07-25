const mongoose = require("mongoose");
// Define a schema
const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  phone: { type: String, require: true },
  email: { type: String, unique: true },
  password: { type: String, require: true },
  userType: {
    type: String,
    enum: ["sso", "normal"],
    default: "normal",
  },
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
