const expressAsyncHandler = require("express-async-handler");
// const { books } = require("../database/db.js");
const Book = require("../models/book.js");
const User = require("../models/user.js");

const getbook = async (req, res) => {
  // const bookId = req.params.id
  // //console.log(userId)
  // const book = books.find((book) => {
  //     return book.id == bookId
  // })
  // if(!book){
  //     res.json({"book": ""})
  // }
  // res.json(book)
  const bookId = req.params.id;
  const book = await Book.findById(bookId);
  return res.json(book);
};

const getbooks = async (req, res) => {
  // //res.json(books)
  // const page = req.query.page;
  // //console.log(req.query);
  // if(Object.keys(req.query).length === 0){
  //     return res.json(books)
  // }

  // const filterBook = books.filter((book) => {
  //     return book.page == page
  // })
  // if(!filterBook){
  //     res.json({"book": ""})
  // }
  // res.json(filterBook)
  //console.log(req.user);
  // const books = await Book.find();
  const books = await Book.aggregate().unwind("authors");
  return res.json(books);
};

const createbook = async (req, res, next) => {
  // //console.log(req.body)
  // const {title, author, page} = req.body
  // const book = {
  //     id:Math.floor(Math.random() * 100),
  //     title,
  //     author,
  //     page
  // }
  // books.push(book)
  // return res.json(book)
  const { page, title, description, genre, byUser } = req.body;
  //console.log(req.body);
  try {
    const book = new Book({
      page: page,
      title: title,
      description: description,
      genre: genre,
      authors: byUser,
    });
    const result = await book.save();
    return res.json(result);
  } catch (err) {
    next(Error(err.errmsg));
  }
};

const deleteBookByID = async (req, res) => {
  // //console.log(req.params.id)
  // const id = req.params.id
  // const book = books.find((book) => {
  //     return book.id == id
  // })
  // //console.log(book)
  // books.pop(book)
  // return res.json(book)
  const id = req.params.id;
  const result = await Book.deleteOne({ _id: id });
  return res.json(result);
};

const updateBookByID = async (req, res) => {
  const id = req.params.id;
  const updateDocument = {
    $set: {
      page: 900,
    },
  };
  const result = await Book.updateOne({ _id: id }, updateDocument);
  return res.json(result);
};

const getGenreCount = expressAsyncHandler(async (req, res) => {
  const reuslt = await Book.aggregate().group({
    _id: "$genre",
    count: { $sum: 1 },
  });
  return res.json(reuslt);
});

module.exports = {
  getbook,
  getbooks,
  createbook,
  deleteBookByID,
  updateBookByID,
  getGenreCount,
};
