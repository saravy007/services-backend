const jwt = require("jsonwebtoken");
const signJWT = (id, email) => {
  const token = jwt.sign(
    {
      id: id,
      email: email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
      issuer: "api.cadt.com",
      audience: "cadt.com",
    }
  );
  return token;
};
module.exports = { signJWT };
