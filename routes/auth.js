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

/**
 * @swagger
 * tags:
 *  name: auth
 */
router.post("/login", loginSchema, handleValidation, loginUser);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [auth]
 *     description: User login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *                  example: Zion_Nicolas9@gmail.com
 *               password:
 *                  type: string
 *                  example: 12345678
 *     responses:
 *       200:
 *         description: Login successfull
 */
router.post("/signup", createUserSchema, handleValidation, signupUser);
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: [auth]
 *     description: User signup
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             type: object
 *             properties:
 *               username:
 *                  type: string
 *                  example: "sok-dara"
 *               phone:
 *                  type: string
 *                  example: "012569874"
 *               email:
 *                  type: string
 *                  example: sok-dara@gmail.com
 *               password:
 *                  type: string
 *                  example: 12345678
 *               confirmedPassword:
 *                  type: string
 *                  example: 12345678
 *     responses:
 *       200:
 *         description: Signup successfull
 */
router.get("/show-google-oauth", showGoogleOAuthScreen);
router.get("/google-callback", handleGoogleLogin);
module.exports = router;
