const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const axios = require("axios");
const { signJWT } = require("../utils");

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Find the user by email
  const user = await User.findOne({ email }).lean();
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // Verify the password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // Sign JWT
  const token = signJWT(user._id, user.email);
  user.token = token;
  return res.json(user);
});

const signupUser = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, gender, dob, address, phone, username, email, password } = req.body;
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create a new user
  const user = new User({
    firstName,
    lastName,
    gender,
    dob,
    address,
    phone,
    username,
    email,
    password: hashedPassword,
  });
  const result = (await user.save()).toObject();
  if (result) {
    // Sign JWT
    const token = signJWT(result._id, result.email);
    result.token = token;
  }
  return res.json(result);
});

// const showGoogleOAuthScreen = expressAsyncHandler(async (req, res) => {
//   console.log("ok");
//   const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&response_type=code&scope=profile email openid`;
//   res.redirect(googleAuthUrl);
// });

// const handleGoogleLogin = expressAsyncHandler(async (req, res) => {
//   const code = req.query.code;
//   //console.log(code);
//   //1-Exchange code for access token and id token
//   const { data } = await axios.post("https://oauth2.googleapis.com/token", {
//     code: code,
//     client_id: process.env.GOOGLE_CLIENT_ID,
//     client_secret: process.env.GOOGLE_CLIENT_SECRET,
//     redirect_uri: process.env.GOOGLE_CALLBACK_URL,
//     grant_type: "authorization_code",
//   });
//   // 2 - Use access_token to get userinfo from Google API
//   const access_token = data.access_token;
//   const get_user_url = "https://www.googleapis.com/oauth2/v2/userinfo";
//   const reponse = await axios.get(get_user_url, {
//     headers: { Authorization: `Bearer ${access_token}` },
//   });
//   const userprofile = reponse.data;
//   // 3 - Register user in our database
//   const user = await User.findOne({ email: userprofile.email });
//   //console.log(user);
//   if (!user) {
//     // Register new user
//     const newUser = new User({
//       name: userprofile.name,
//       email: userprofile.email,
//       userType: "sso",
//       username: userprofile.given_name,
//     });
//     const result = await newUser.save();
//     const token = signJWT(result._id, result.email);
//     return res.json(token);
//   }
//   // 4 - Sign user with our own JWT
//   const token = signJWT(user._id, user.email);
//   return res.json(token);
// });

module.exports = {
  loginUser,
  signupUser,
};
