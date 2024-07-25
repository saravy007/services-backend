const express = require("express");
const {
  createTweet,
  getTweetByID,
  getTweets,
  deleteTweetById,
} = require("../controllers/tweet");
const { authroize, resourceControl } = require("../middlewares");
const router = express.Router();

router.post("/", authroize("create_record"), createTweet);
router.get("/:id", authroize("read_record"), getTweetByID);
router.get("/", getTweets); //authroize("read_record")
router.delete(
  "/:id",
  authroize("delete_own_record"),
  resourceControl("tweets"),
  deleteTweetById
);

module.exports = router;
