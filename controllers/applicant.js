const asyncHandler = require("express-async-handler");
const Applicant = require("../models/applicant");
const ServiceTake = require("../models/serviceTake");

const getApplicants = asyncHandler(async (req, res) => {
  const applicants = await ServiceTake.find().populate({
    path: "id",
  });
  // .populate("byService");byApplicant
  // .exec();
  // console.log(applicants);
  return res.json(applicants);
});

const getApplicant = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const applicant = await Applicant.findById(id);
  return res.json(applicant);
});

module.exports = { getApplicants, getApplicant };
