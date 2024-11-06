const mongoose = require("mongoose");
// Define a schema
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
  edit_attach1: { type: String },
  edit_attach2: { type: String },
  edit_attach3: { type: String },
  edit_attach4: { type: String },
  edit_attach5: { type: String },
  edit_attach6: { type: String },
  createdDate: { type: Date, default: Date.now() },
});
// Create a model
const Edit = mongoose.model("edit", editSchema);
module.exports = Edit;
