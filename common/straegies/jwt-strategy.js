//const passport = require('passport');
const { Strategy, ExtractJwt } = require("passport-jwt");
//const ExtractJwt = require("passport-jwt").Strategy;
const User = require("../../models/user");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  issuer: "api.cadt.com",
  audience: "cadt.com",
};

const jwtStrategy = new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = jwtStrategy;
