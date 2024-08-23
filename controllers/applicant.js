const asyncHandler = require("express-async-handler");
const Applicant = require("../models/applicant");
const ServiceTake = require("../models/serviceTake");
const Services = require("../models/services");
const CertificateType = require("../models/certificateType");
const mongoose = require("mongoose");

const getApplicants = asyncHandler(async (req, res) => {
  const applicants = await Applicant.find().populate({
    path: "serviceTake",
    populate: [
      {
        path: "byService",
        model: Services,
        localField: "byService",
        foreignField: "id",
      },
      {
        path: "verifyByCertType",
        model: CertificateType,
        localField: "verifyByCertType",
        foreignField: "id",
      },
    ],
  });
  return res.json(applicants);
});

const getApplicant = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const applicant = await Applicant.findById(id).populate({
    path: "serviceTake",
    populate: [
      {
        path: "byService",
        model: Services,
        localField: "byService",
        foreignField: "id",
      },
      {
        path: "verifyByCertType",
        model: CertificateType,
        localField: "verifyByCertType",
        foreignField: "id",
      },
    ],
  });
  return res.json(applicant);
});

const getApplicantByUserID = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const applicant = await Applicant.find({ byUser: { _id: id } }).populate({
    path: "serviceTake",
    populate: [
      {
        path: "byService",
        model: Services,
        localField: "byService",
        foreignField: "id",
      },
      {
        path: "verifyByCertType",
        model: CertificateType,
        localField: "verifyByCertType",
        foreignField: "id",
      },
    ],
  });
  return res.json(applicant);
});

const deleteApplicantById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const serviceTakeObj = await Applicant.findById(id).select(
    "serviceTake -_id"
  );
  const serviceTakeId = JSON.parse(JSON.stringify(serviceTakeObj)).serviceTake;

  const resultApp = await Applicant.deleteOne({ _id: id });
  const resultService = await ServiceTake.deleteOne({ _id: serviceTakeId });
  return res.json({ resultApp, resultService });
});

const createApplicant = asyncHandler(async (req, res) => {
  const { ...self } = req.body;
  const uid = new mongoose.Types.ObjectId(req.params.uid);

  let serviceTake;
  if (self.byService == 1) {
    serviceTake = new ServiceTake({
      byService: self.byService,
      verifyByCertType: self.verifyByCertType,
      verify_attach1: self.verify_attach1,
    });
  } else if (self.byService == 2) {
    serviceTake = new ServiceTake({
      byService: self.byService,
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
    serviceTake = new ServiceTake({
      byService: self.byService,
      reissue_attach1: self.reissue_attach1,
      reissue_attach2: self.reissue_attach2,
      reissue_attach3: self.reissue_attach3,
      reissue_attach4: self.reissue_attach4,
    });
  }
  const resultServiceTake = await serviceTake.save();

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
    serviceTake: resultServiceTake._id,
  });
  const resultApp = await applicant.save();
  return res.json(resultApp);
});

const updateApplicantById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const serviceTakeObj = await Applicant.findById(id).select(
    "serviceTake -_id"
  );
  const serviceTakeId = JSON.parse(JSON.stringify(serviceTakeObj)).serviceTake;

  const byServiceObj = await ServiceTake.findById(serviceTakeId).select(
    "byService -_id"
  );
  const byService = JSON.parse(JSON.stringify(byServiceObj)).byService;

  const { ...self } = req.body;
  const updateDocument = {
    $set: self,
  };

  const resultApp = await Applicant.updateOne({ _id: id }, updateDocument);

  if (self.byService != byService) {
    const removeService1 = {
      $unset: {
        verifyByCertType: 1,
        verify_attach1: "",
      },
    };
    const removeService2 = {
      $unset: {
        is_name: "",
        old_name: "",
        new_name: "",
        is_gender: "",
        old_gender: "",
        new_gender: "",
        is_dob: "",
        old_dob: "",
        new_dob: "",
        is_pob: "",
        old_pob: "",
        new_pob: "",
        is_father: "",
        old_father: "",
        new_father: "",
        is_mother: "",
        old_mother: "",
        new_mother: "",
        edit_attach1: "",
        edit_attach2: "",
        edit_attach3: "",
        edit_attach4: "",
        edit_attach5: "",
        edit_attach6: "",
      },
    };
    const removeService3 = {
      $unset: {
        reissue_attach1: "",
        reissue_attach2: "",
        reissue_attach3: "",
        reissue_attach4: "",
      },
    };
    const resultRemoveService = await ServiceTake.updateOne(
      { _id: serviceTakeId },
      byService == 1
        ? removeService1
        : byService == 2
        ? removeService2
        : removeService3
    );
  }

  const resultUpdateService = await ServiceTake.updateOne(
    { _id: serviceTakeId },
    updateDocument
  );

  return res.json({ resultApp, resultUpdateService });
});

module.exports = {
  getApplicants,
  getApplicant,
  getApplicantByUserID,
  deleteApplicantById,
  createApplicant,
  updateApplicantById,
};
