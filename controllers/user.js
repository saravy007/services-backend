const asyncHandler = require("express-async-handler");
// const Tweet = require("../models/tweet.js");
const User = require("../models/user");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
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
  const { firstName, lastName, gender, dob, phone, address } = req.body;
  const updateDocument = {
    $set: {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dob: dob,
      phone: phone,
      address: address,
    },
  };
  const result = await User.findOneAndUpdate({ _id: id }, updateDocument, {
    new: true,
  });
  return res.json(result);
});

module.exports = {
  getUser,
  getUsers,
  deleteUserById,
  updateUserByID,
};
