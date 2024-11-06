const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { getPermissionsByRoleName } = require("../roles/role");
const Applicant = require("../models/applicant");
// const Tweet = require("../models/tweet");
// Example middleware function
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Call the next middleware function
};

const errorHandle = (err, req, res, next) => {
  //console.error(err.stack);
  res.status(500).json({ message: err.message });
};

//validate query is number or not
const isValidat = (req, res, next) => {
  const id = req.params.id;
  //console.log("hello" + id)
  if (!isNaN(id)) {
    next();
  }
  throw Error(`Id: ${id} contains string`);
};

const verifyToken = (req, res, next) => {
  // Extract token from request header from clinet
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied!" });
  }
  token = token.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

const handleValidation = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
  } else {
    return res.status(401).json({ error: result.array() });
  }
};

const authorize = (permission) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Access denied!" });
    }
    const permissions = getPermissionsByRoleName(user.role);
    if (permissions.includes(permission)) {
      req.permission = permission;
      next();
    } else {
      return res.status(403).json({ error: "Forbidden" });
    }
  };
};

const resourceControl = (resource) => {
  return async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;
    //console.log(req.user.role);
    if (req.user.role == "admin") {
      //console.log("go next");
      next();
    } else if (resource == "applicant") {
      if (req.permission == "app_delete" || req.permission == "app_update") {
        const app = await Applicant.findOne({ _id: id, byUser: userId });
        if (app) {
          next();
        } else {
          return res.status(403).json({ error: "Forbidden" });
        }
      }
    }
  };
};

module.exports = {
  logger,
  isValidat,
  errorHandle,
  verifyToken,
  handleValidation,
  authorize,
  resourceControl,
};
