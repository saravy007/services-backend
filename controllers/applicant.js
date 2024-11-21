const asyncHandler = require("express-async-handler");
const Applicant = require("../models/applicant");
const Verify = require("../models/verify");
const Edit = require("../models/edit");
const Reissue = require("../models/reissue");
const mongoose = require("mongoose");

const countApplicants = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const countApp = await Applicant.countDocuments({
    byUser: id,
  });
  // mark by saravy
  const userId = new mongoose.Types.ObjectId(id);
  const countByCat = await Applicant.aggregate([
    { $match: { byUser: userId } }, // Add any condition here
    { $sortByCount: "$service" }, // Sort by count of 'category' field
  ]);

  return res.json({ countApp, countByCat });
});

const getApplicants = asyncHandler(async (req, res) => {
  const applicants = await Applicant.find().populate("serviceTake");
  return res.json(applicants);
});

const getApplicant = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const applicant = await Applicant.findById(id).populate("serviceTake");
  return res.json(applicant);
});

const getApplicantByUserID = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const applicant = await Applicant.find({ byUser: { _id: id } }).populate(
    "serviceTake"
  );
  return res.json(applicant);
});

const deleteApplicantById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const serviceTakeObj = await Applicant.findById(id).select(
    "service serviceTake -_id"
  );
  const service = JSON.parse(JSON.stringify(serviceTakeObj)).service;
  const serviceTakeId = JSON.parse(JSON.stringify(serviceTakeObj)).serviceTake;

  const resultApp = await Applicant.deleteOne({ _id: id });
  let resultService;
  if (service == "verify") {
    resultService = await Verify.deleteOne({ _id: serviceTakeId });
  } else if (service == "edit") {
    resultService = await Edit.deleteOne({ _id: serviceTakeId });
  } else {
    resultService = await Reissue.deleteOne({ _id: serviceTakeId });
  }

  return res.json({ resultApp, resultService });
});

const createApplicant = asyncHandler(async (req, res) => {
  const { ...self } = req.body;
  const uid = new mongoose.Types.ObjectId(req.params.uid);

  //save service data to db
  let service;
  if (self.service == "verify") {
    service = new Verify({
      verifyByCertType: self.verifyByCertType,
      verify_attach1: self.verify_attach1,
    });
  } else if (self.service == "edit") {
    service = new Edit({
      is_name: self.is_name,
      old_name: self.old_name,
      new_name: self.new_name,
      is_gender: self.is_gender,
      old_gender: self.old_gender,
      new_gender: self.new_gender,
      is_dob: self.is_dob,
      old_dob: self.old_dob,
      new_dob: self.new_dob,
      is_pob: self.is_pob,
      old_pob: self.old_pob,
      new_pob: self.new_pob,
      is_father: self.is_father,
      old_father: self.old_father,
      new_father: self.new_father,
      is_mother: self.is_mother,
      old_mother: self.old_mother,
      new_mother: self.new_mother,
      edit_attach1: self.edit_attach1,
      edit_attach2: self.edit_attach2,
      edit_attach3: self.edit_attach3,
      edit_attach4: self.edit_attach4,
      edit_attach5: self.edit_attach5,
      edit_attach6: self.edit_attach6,
    });
  } else {
    service = new Reissue({
      reissue_attach1: self.reissue_attach1,
      reissue_attach2: self.reissue_attach2,
      reissue_attach3: self.reissue_attach3,
      reissue_attach4: self.reissue_attach4,
    });
  }
  const resultService = await service.save();
  //save applicant data to db
  const applicant = new Applicant({
    byUser: uid,
    name: self.name,
    gender: self.gender,
    dob: self.dob,
    address: self.address,
    examDate: self.examDate,
    examCenter: self.examCenter,
    room: self.room,
    seat: self.seat,
    grade: self.grade,
    phone: self.phone,
    service: self.service,
    serviceTake: resultService._id,
  });
  const resultApp = await applicant.save();
  return res.json(resultApp);
});

const updateApplicantById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const serviceTakeObj = await Applicant.findById(id).select(
    "service serviceTake -_id"
  );
  const serviceTakeId = JSON.parse(JSON.stringify(serviceTakeObj)).serviceTake;
  const service = JSON.parse(JSON.stringify(serviceTakeObj)).service;

  const { ...self } = req.body;
  const updateDocument = {
    $set: self,
  };

  ///////////////////////////////////////////////////
  let resultApp;
  if (self.service != service) {
    //remove existing service
    let resultRemoveService;
    if (service == "verify") {
      resultRemoveService = await Verify.deleteOne({ _id: serviceTakeId });
    } else if (service == "edit") {
      resultRemoveService = await Edit.deleteOne({ _id: serviceTakeId });
    } else {
      resultRemoveService = await Reissue.deleteOne({ _id: serviceTakeId });
    }
    //add new service
    let serviceNew;
    if (self.service == "verify") {
      serviceNew = new Verify({
        verifyByCertType: self.verifyByCertType,
        verify_attach1: self.verify_attach1,
      });
    } else if (self.service == "edit") {
      serviceNew = new Edit({
        is_name: self.is_name,
        old_name: self.old_name,
        new_name: self.new_name,
        is_gender: self.is_gender,
        old_gender: self.old_gender,
        new_gender: self.new_gender,
        is_dob: self.is_dob,
        old_dob: self.old_dob,
        new_dob: self.new_dob,
        is_pob: self.is_pob,
        old_pob: self.old_pob,
        new_pob: self.new_pob,
        is_father: self.is_father,
        old_father: self.old_father,
        new_father: self.new_father,
        is_mother: self.is_mother,
        old_mother: self.old_mother,
        new_mother: self.new_mother,
        edit_attach1: self.edit_attach1,
        edit_attach2: self.edit_attach2,
        edit_attach3: self.edit_attach3,
        edit_attach4: self.edit_attach4,
        edit_attach5: self.edit_attach5,
        edit_attach6: self.edit_attach6,
      });
    } else {
      serviceNew = new Reissue({
        reissue_attach1: self.reissue_attach1,
        reissue_attach2: self.reissue_attach2,
        reissue_attach3: self.reissue_attach3,
        reissue_attach4: self.reissue_attach4,
      });
    }
    const resultService = await serviceNew.save();
    //update serviceTakeId in table applicant
    updateDocument.$set.serviceTake = resultService._id;
    //console.log(updateDocument);
    resultApp = await Applicant.updateOne({ _id: id }, updateDocument);
  } else {
    //update serivce
    let resultUpdateService;
    if (service == "verify") {
      resultUpdateService = await Verify.updateOne(
        { _id: serviceTakeId },
        updateDocument
      );
    } else if (service == "edit") {
      resultUpdateService = await Edit.updateOne(
        { _id: serviceTakeId },
        updateDocument
      );
    } else {
      resultUpdateService = await Reissue.updateOne(
        { _id: serviceTakeId },
        updateDocument
      );
    }
    //update applicant
    resultApp = await Applicant.updateOne({ _id: id }, updateDocument);
  }

  console.log(resultApp);
  /////////////////////////////////////////
  return res.json({ resultApp });
});

module.exports = {
  getApplicants,
  getApplicant,
  getApplicantByUserID,
  deleteApplicantById,
  createApplicant,
  updateApplicantById,
  countApplicants,
};
