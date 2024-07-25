const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  page: { require: true, type: Number },
  title: { require: true, type: String },
  description: { require: true, type: String },
  genre: { require: true, type: String },
  authors: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  createdDate: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
