const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  text: String,
  byUser: { type: mongoose.Types.ObjectId, ref: 'User' },
  createdDate: { type: Date, default: Date.now }
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;