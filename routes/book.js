const express = require("express");
const { isValidat } = require("../middlewares");
const {
  getbook,
  getbooks,
  createbook,
  deleteBookByID,
  updateBookByID,
} = require("../controllers/book");
const bookRouter = express.Router();

//get book by id
bookRouter.get("/:id", getbook); //, isValidat
//get all books query by pages
bookRouter.get("/", getbooks);
//
bookRouter.post("/", createbook);
//
bookRouter.delete("/:id", deleteBookByID);
//
bookRouter.put("/:id", updateBookByID);

module.exports = bookRouter;
