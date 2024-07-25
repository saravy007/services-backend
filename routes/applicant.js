const express = require("express");
const { getApplicant, getApplicants } = require("../controllers/applicant");
const router = express.Router();

//get user by id
router.get("/:id", getApplicant); //isValidat
router.get("/", getApplicants);

module.exports = router;
