const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
// Define verify schema
const verifySchema = new mongoose.Schema({
  verifyByCertType: {
    type: String,
    require: true,
    enum: ["diploma", "temp_cert", "graduate_cert"],
  },
});
// Define edit schema
const editSchema = new mongoose.Schema({
  is_name: { type: Boolean },
  old_name: { type: String },
  new_name: { type: String },
  is_gender: { type: Boolean },
  old_gender: { type: String },
  new_gender: { type: String },
  is_dob: { type: Boolean },
  old_dob: { type: Date },
  new_dob: { type: Date },
  is_pob: { type: Boolean },
  old_pob: { type: String },
  new_pob: { type: String },
  is_father: { type: Boolean },
  old_father: { type: String },
  new_father: { type: String },
  is_mother: { type: Boolean },
  old_mother: { type: String },
  new_mother: { type: String },
});
// Define form schema
const formSchema = new mongoose.Schema({
  byUser: { type: mongoose.Types.ObjectId, ref: "User" },
  examDate: { type: Date, require: true },
  examCenter: { type: String, require: true },
  room: { type: Number, require: true },
  seat: { type: Number, require: true },
  grade: { type: String },
  percentile: { type: Number },
  service: {
    type: String,
    required: true,
    enum: ["verify", "edit", "reissue"],
  },
  verify: { type: verifySchema },
  edit: { type: editSchema},
  status: { type: Number, default: 1 },
  createdDate: { type: Date, default: Date.now() },
});
// Add an auto-incrementing field called `userId`
formSchema.plugin(AutoIncrement, { inc_field: "receiptNo" });
// Create a model
const Form = mongoose.model("Form", formSchema);
module.exports = Form;
