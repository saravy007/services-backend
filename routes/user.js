const express = require("express");
const {
  getUser,
  getUsers,
  // createUser,
  deleteUserById,
  updateUserByID,
  updateUserByIDDB,
} = require("../controllers/user");
const router = express.Router();
const { handleValidation, authroize } = require("../middlewares");
const { updateUserSchema } = require("../common/validation");

//get user by id
router.get("/:id", getUser); //isValidat
//get all user
router.get("/", getUsers);
//create new user
// router.post("/", createUser);
//delete user
router.delete("/:id", authroize("delete_record"), deleteUserById);
//update user
router.put("/:id", updateUserByID);

router.put("/:id", updateUserSchema, handleValidation, updateUserByIDDB);

module.exports = router;
