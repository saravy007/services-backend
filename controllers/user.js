const asyncHandler = require("express-async-handler");
// const Tweet = require("../models/tweet.js");
const User = require("../models/user");
// const Book = require("../models/book.js");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find(); //.populate("tweets");
  return res.json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const userID = req.params.id;
  const user = await User.findById(userID);
  return res.json(user);
});

const deleteUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await User.deleteOne({ _id: id });
  return res.json(result);
});

const updateUserByID = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, gender, dob, address } = req.body;
  const updateDocument = {
    $set: {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dob: dob,
      address: address,
    },
  };
  const result = await User.updateOne({ _id: id }, updateDocument);
  return res.json(result);
});

// const updateUserByIDDB = asyncHandler(async (req, res, next) => {
//   const id = req.params.id;
//   const { password, confirmedPassword, ...self } = req.body;
//   const result = await User.updateOne({ ...self, id });
//   const user = await User.findById(id);
//   return res.json({ result, user });
// });

module.exports = {
  getUser,
  getUsers,
  deleteUserById,
  updateUserByID,
};
