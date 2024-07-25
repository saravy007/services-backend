const express = require("express");
const {
  loginUser,
  signupUser,
  showGoogleOAuthScreen,
  handleGoogleLogin,
} = require("../controllers/auth");
const { loginSchema, createUserSchema } = require("../common/validation");
const { handleValidation } = require("../middlewares");
const router = express.Router();

router.post("/login", loginSchema, handleValidation, loginUser);
router.post("/signup", createUserSchema, handleValidation, signupUser);
router.get("/show-google-oauth", showGoogleOAuthScreen);
router.get("/google-callback", handleGoogleLogin);
module.exports = router;
