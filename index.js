const fs = require("fs");
const https = require("https");
const express = require("express");
const app = express();
const port = 4000;
const { logger, errorHandle } = require("./middlewares");
const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/user.js");
const appRouter = require("./routes/form.js");
const bodyParser = require("body-parser");
const dbConnect = require("./database/mongo_db.js");
require("dotenv").config();
const passport = require("passport");
const jwtStrategy = require("./common/straegies/jwt-strategy.js");
const { setupSwagger } = require("./swagger/index.js");
const userProfileRouter = require("./routes/user-profile.js");
const fileAttachRouter = require("./routes/file-attach.js");
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
app.use("/form", passport.authenticate("jwt", { session: false }), appRouter);
app.use("/user-profile", passport.authenticate("jwt", { session: false }), userProfileRouter);
app.use("/file-attach", passport.authenticate("jwt", { session: false }), fileAttachRouter);
// Basic error handling middleware
app.use(errorHandle);

server = https.createServer({ key, cert }, app);
server.listen(port, () => {
  console.log("Listening on port 4000!");
});
