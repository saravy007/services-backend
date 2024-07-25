const fs = require("fs");
const https = require("https");
const express = require("express");
const app = express();
const port = 4000;
const { logger, errorHandle, verifyToken } = require("./middlewares");
const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/user.js");
const appRouter = require("./routes/applicant.js");
//----------------------
const bookRouter = require("./routes/book.js");
const tweetRouter = require("./routes/tweet.js");
//---------------------------
const bodyParser = require("body-parser");
const dbConnect = require("./database/mongo_db.js");
require("dotenv").config();
const passport = require("passport");
const jwtStrategy = require("./common/straegies/jwt-strategy.js");

const key = fs.readFileSync("localhost-key.pem", "utf-8");
const cert = fs.readFileSync("localhost.pem", "utf-8");

dbConnect().catch((err) => {
  console.log(err);
});
passport.use(jwtStrategy);
app.use(bodyParser.json());
app.use(logger);
app.use("/auth", authRouter);
app.use("/users", passport.authenticate("jwt", { session: false }), userRouter);
app.use(
  "/applicants",
  passport.authenticate("jwt", { session: false }),
  appRouter
);
//-------------------------------
app.use("/books", passport.authenticate("jwt", { session: false }), bookRouter);
app.use(
  "/tweets",
  passport.authenticate("jwt", { session: false }),
  tweetRouter
); //verifyToken
//---------------------------------
// Basic error handling middleware
app.use(errorHandle);

server = https.createServer({ key, cert }, app);
server.listen(port, () => {
  console.log("Listening on port 4000!");
});
