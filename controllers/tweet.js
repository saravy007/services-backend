const Tweet = require("../models/tweet");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const createTweet = async (req, res, next) => {
  const { text, byUser } = req.body;

  try {
    const tweet = new Tweet({
      text: text,
      byUser: byUser,
    });
    const result = await tweet.save();
    //get user record from user table by id
    const user = await User.findById(byUser);
    //push tweetid to user record
    user.tweets.push(result._id);
    await user.save();

    return res.json(result);
  } catch (err) {
    next(Error(err.errmsg));
  }
};

const getTweetByID = asyncHandler(async (req, res, next) => {
  //console.log("hello");
  const id = req.params.id;
  const result = await Tweet.findById(id);
  return res.json(result);
});

const getTweets = asyncHandler(async (req, res) => {
  const tweet = await Tweet.find();
  console.log("hello saravy");
  return res.json({ tweet });
});

const deleteTweetById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await Tweet.deleteOne({ _id: id });
  return res.json(result);
});

module.exports = { createTweet, getTweetByID, getTweets, deleteTweetById };
