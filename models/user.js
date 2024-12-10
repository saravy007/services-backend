const mongoose = require("mongoose");
// Define a schema
const userSchema = new mongoose.Schema({  
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  gender: { type: String, require: true },
  dob: { type: Date, require: true },
  address: { type: String },  
  phone: { type: String },
  username: { type: String, require: true },
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
