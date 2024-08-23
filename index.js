const fs = require("fs");
const https = require("https");
const express = require("express");
const app = express();
const port = 4000;
const { logger, errorHandle, verifyToken } = require("./middlewares");
const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/user.js");
const appRouter = require("./routes/applicant.js");
const bodyParser = require("body-parser");
const dbConnect = require("./database/mongo_db.js");
require("dotenv").config();
const passport = require("passport");
const jwtStrategy = require("./common/straegies/jwt-strategy.js");
const { setupSwagger } = require("./swagger/index.js");

const key = fs.readFileSync("localhost-key.pem", "utf-8");
const cert = fs.readFileSync("localhost.pem", "utf-8");

dbConnect().catch((err) => {
  console.log(err);
});
passport.use(jwtStrategy);

setupSwagger(app);
app.use(bodyParser.json());
app.use(logger);
app.use("/auth", authRouter);
app.use("/users", passport.authenticate("jwt", { session: false }), userRouter);
app.use(
  "/applicant",
  passport.authenticate("jwt", { session: false }),
  appRouter
);
// Basic error handling middleware
app.use(errorHandle);

server = https.createServer({ key, cert }, app);
server.listen(port, () => {
  console.log("Listening on port 4000!");
});
