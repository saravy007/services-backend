const asyncHandler = require("express-async-handler");
const Form = require("../models/form");
const mongoose = require("mongoose");
const { FileAttach } = require("../models/file-attach");
const fs = require("fs");

const getQrForm = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const form = await Form.findById(id).select("status");
  return res.json(form);
});

const countForms = asyncHandler(async (req, res) => {
  const userid = req.params.userid;
  const countApp = await Form.countDocuments({
    byUser: userid,
  });
  const userID = new mongoose.Types.ObjectId(userid);
  const countByCat = await Form.aggregate([
    { $match: { byUser: userID } }, // Add any condition here
    { $sortByCount: "$service" }, // Sort by count of 'category' field
  ]);
  return res.json({ countApp, countByCat });
});

const getForms = asyncHandler(async (req, res) => {
  const forms = await Form.find().populate("byUser");
  return res.json(forms);
});

const getForm = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const form = await Form.findById(id).populate("byUser");
  return res.json(form);
});

const getFormByUserID = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const form = await Form.find({ byUser: { _id: id } }).populate("byUser");
  return res.json(form);
});

const deleteFormById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const fileAttach = await FileAttach.find({ byform: new mongoose.Types.ObjectId(id) });
  if (fileAttach.length > 0) {
    //delete old record from db
    const resultDelete = await FileAttach.deleteMany({ byform: id });
    //delete image profile in directory
    for (let i = 0; i < fileAttach.length; i++) {
      fs.unlinkSync(fileAttach[i].path);
    }      
  }

  const result = await Form.deleteOne({ _id: id });
  return res.json(result);
  // //get type of service and serviceTakeId from form document
  // const serviceTakeObj = await form.findById(id).select("service serviceTake -_id");
  // const service = JSON.parse(JSON.stringify(serviceTakeObj)).service;
  // const serviceTakeId = JSON.parse(JSON.stringify(serviceTakeObj)).serviceTake;
  // //delete form document
  // const resultApp = await form.deleteOne({ _id: id });
  // let resultService;
  // let resultFile;
  // if (service == "verify") {
  //   //get file_attach id from verify document
  //   const fileId = await Verify.findById(serviceTakeId).select("file_attach1 -_id");
  //   //delete verify document
  //   resultService = await Verify.deleteOne({ _id: serviceTakeId });
  //   //handle error when fileId=null 
  //   if(fileId.file_attach1){
  //     //get file part from file-upload document
  //     const filePath = await FileAttach.findById(fileId.file_attach1).select("path -_id");
  //     //delete file document       
  //     resultFile = await FileAttach.deleteOne({ _id: fileId.file_attach1 });
  //     //delete file in directory
  //     fs.unlinkSync(filePath.path);
  //   }    
  // } else if (service == "edit") {
  //   //get file_attach id from edit document
  //   const fileId = await Edit.findById(serviceTakeId)
  //     .select("file_attach1 file_attach2 file_attach3 file_attach4 file_attach5 file_attach6 -_id");
  //   // Convert Mongoose document to plain JavaScript object if necessary
  //   const fileIdObject = fileId.toObject();
  //   //delete edit document
  //   resultService = await Edit.deleteOne({ _id: serviceTakeId });    
  //   // Loop through selected fields
  //   for (const [fileAttach, id] of Object.entries(fileIdObject)) {
  //     //console.log(`${fileAttach}: ${id}`);
  //     //handle error when fileId=null 
  //     if(id){
  //       //get file part from file-upload document
  //       const filePath = await FileAttach.findById(id).select("path -_id");
  //       //delete file document
  //       const file_id = new mongoose.Types.ObjectId(id);       
  //       resultFile = await FileAttach.deleteOne({ _id: file_id });
  //       //delete file in directory
  //       fs.unlinkSync(filePath.path);
  //     } 
  //   }
  // } else {
  //   //get file_attach id from reissue document
  //   const fileId = await Reissue.findById(serviceTakeId)
  //     .select("file_attach1 file_attach2 file_attach3 file_attach4 -_id");
  //   // Convert Mongoose document to plain JavaScript object if necessary
  //   const fileIdObject = fileId.toObject();
  //   //delete reissue document
  //   resultService = await Reissue.deleteOne({ _id: serviceTakeId }); 
  //   // Loop through selected fields
  //   for (const [fileAttach, id] of Object.entries(fileIdObject)) {
  //     //console.log(`${fileAttach}: ${id}`);
  //     //handle error when fileId=null 
  //     if(id){
  //       //get file part from file-upload document
  //       const filePath = await FileAttach.findById(id).select("path -_id");
  //       //delete file document      
  //       const file_id = new mongoose.Types.ObjectId(id); 
  //       resultFile = await FileAttach.deleteOne({ _id: file_id });
  //       //delete file in directory
  //       fs.unlinkSync(filePath.path);
  //     } 
  //   }    
  // }

  // return res.json({ resultApp, resultService });
});

const createForm = asyncHandler(async (req, res) => { 
  const userid = new mongoose.Types.ObjectId(req.params.userid);
  const { ...self } = req.body;
  const formDoc = {
    byUser: userid,
    ...self,
  };
  const form = new Form(formDoc);
  const resultApp = await form.save();
  return res.json(resultApp);
  //==========upload file attach==========
  // let resultVerifyAttach;
  // let resultEditAttach = [];
  // let resultReissueAttach = [];

  // if (self.service == "verify") {
  //   if (req.files['file_attach1'] == undefined) {
  //     console.log("No file selected!");
  //   } else {
  //     const fileProperties = req.files['file_attach1'][0];
  //     const file = new FileAttach(fileProperties);
  //     const path = "/IDG Data/Project/services-backend/" + file.path;
  //     file.path = path;
  
  //     resultVerifyAttach = await file.save();
  //   }
  // }else if(self.service == "edit"){
  //   for (let index = 1; index <= 6; index++) {
  //     if (req.files[`file_attach${index}`] == undefined) {
  //       console.log("No file selected!");
  //     } else {
  //       const fileProperties = req.files[`file_attach${index}`][0];
  //       const file = new FileAttach(fileProperties);
  //       const path = "/IDG Data/Project/services-backend/" + file.path;
  //       file.path = path;
    
  //       resultEditAttach[index-1] = await file.save();
  //     }
  //   }    
  // }else{    
  //   for (let index = 1; index <= 4; index++) {
  //     if (req.files[`file_attach${index}`] == undefined) {
  //       console.log("No file selected!");
  //     } else {
  //       const fileProperties = req.files[`file_attach${index}`][0];
  //       const file = new FileAttach(fileProperties);
  //       const path = "/IDG Data/Project/services-backend/" + file.path;
  //       file.path = path;
    
  //       resultReissueAttach[index-1] = await file.save();
  //     }
  //   }    
  // }
  // //========save service data to db=========
  // let service;
  // if (self.service == "verify") {
  //   service = new Verify({
  //     verifyByCertType: self.verifyByCertType,
  //     file_attach1: resultVerifyAttach == undefined ? null : new mongoose.Types.ObjectId(resultVerifyAttach._id),
  //   });
  // } else if (self.service == "edit") {
  //   service = new Edit({
  //     is_name: self.is_name,
  //     old_name: self.old_name,
  //     new_name: self.new_name,
  //     is_gender: self.is_gender,
  //     old_gender: self.old_gender,
  //     new_gender: self.new_gender,
  //     is_dob: self.is_dob,
  //     old_dob: self.old_dob,
  //     new_dob: self.new_dob,
  //     is_pob: self.is_pob,
  //     old_pob: self.old_pob,
  //     new_pob: self.new_pob,
  //     is_father: self.is_father,
  //     old_father: self.old_father,
  //     new_father: self.new_father,
  //     is_mother: self.is_mother,
  //     old_mother: self.old_mother,
  //     new_mother: self.new_mother,
  //     file_attach1: resultEditAttach[0] == undefined ? null : new mongoose.Types.ObjectId(resultEditAttach[0]._id),
  //     file_attach2: resultEditAttach[1] == undefined ? null : new mongoose.Types.ObjectId(resultEditAttach[1]._id),
  //     file_attach3: resultEditAttach[2] == undefined ? null : new mongoose.Types.ObjectId(resultEditAttach[2]._id),
  //     file_attach4: resultEditAttach[3] == undefined ? null : new mongoose.Types.ObjectId(resultEditAttach[3]._id),
  //     file_attach5: resultEditAttach[4] == undefined ? null : new mongoose.Types.ObjectId(resultEditAttach[4]._id),
  //     file_attach6: resultEditAttach[5] == undefined ? null : new mongoose.Types.ObjectId(resultEditAttach[5]._id),
  //   });
  // } else {
  //   service = new Reissue({
  //     file_attach1: resultReissueAttach[0] == undefined ? null : new mongoose.Types.ObjectId(resultReissueAttach[0]._id),
  //     file_attach2: resultReissueAttach[1] == undefined ? null : new mongoose.Types.ObjectId(resultReissueAttach[1]._id),
  //     file_attach3: resultReissueAttach[2] == undefined ? null : new mongoose.Types.ObjectId(resultReissueAttach[2]._id),
  //     file_attach4: resultReissueAttach[3] == undefined ? null : new mongoose.Types.ObjectId(resultReissueAttach[3]._id),
  //   });
  // }
  // const resultService = await service.save();
});

const updateFormById = asyncHandler(async (req, res) => {  
  const id = req.params.id;
  const { ...self } = req.body;
  const updateDocument = {
    ...self,
  };
  
  const serviceObj = (await Form.findById(id).select("service -_id")).toObject();
  if (updateDocument.service != serviceObj.service){
    //chang type of service
    const App = await Form.findById(id).then((doc) => {
      if (doc) {
        if(serviceObj.service == "verify"){
          doc.verify = null; // Set verify to null
        }else if (serviceObj.service == "edit"){
          doc.edit = null; // Set edit to null
        }        
        return doc.save();   // Save the changes
      }
    });    
  }
  const result = await Form.updateOne({ _id: id }, updateDocument);
  return res.json(result);
  // const serviceTakeObj = await form.findById(id).select(
  //   "service serviceTake -_id"
  // );
  // const serviceTakeId = JSON.parse(JSON.stringify(serviceTakeObj)).serviceTake;
  // const service = JSON.parse(JSON.stringify(serviceTakeObj)).service;

  // const { ...self } = req.body;
  // const updateDocument = {
  //   $set: self,
  // };
  // //delete file document and file in directory=========================
  // let resultFile;
  // if (service == "verify") {
  //   //get file_attach id from verify document
  //   const fileId = await Verify.findById(serviceTakeId).select("file_attach1 -_id");
  //   //handle error when fileId=null 
  //   if(fileId.file_attach1){
  //     //get file part from file-upload document
  //     const filePath = await FileAttach.findById(fileId.file_attach1).select("path -_id");
  //     //delete file document       
  //     resultFile = await FileAttach.deleteOne({ _id: fileId.file_attach1 });
  //     //delete file in directory
  //     fs.unlinkSync(filePath.path);
  //   }    
  // } else if (service == "edit") {
  //   //get file_attach id from edit document
  //   const fileId = await Edit.findById(serviceTakeId)
  //     .select("file_attach1 file_attach2 file_attach3 file_attach4 file_attach5 file_attach6 -_id");
  //   // Convert Mongoose document to plain JavaScript object if necessary
  //   const fileIdObject = fileId.toObject();
  //   // Loop through selected fields
  //   for (const [fileAttach, id] of Object.entries(fileIdObject)) {
  //     //handle error when fileId=null 
  //     if(id){
  //       //get file part from file-upload document
  //       const filePath = await FileAttach.findById(id).select("path -_id");
  //       //delete file document
  //       const file_id = new mongoose.Types.ObjectId(id);       
  //       resultFile = await FileAttach.deleteOne({ _id: file_id });
  //       //delete file in directory
  //       fs.unlinkSync(filePath.path);
  //     } 
  //   }
  // } else {
  //   //get file_attach id from reissue document
  //   const fileId = await Reissue.findById(serviceTakeId)
  //     .select("file_attach1 file_attach2 file_attach3 file_attach4 -_id");
  //   // Convert Mongoose document to plain JavaScript object if necessary
  //   const fileIdObject = fileId.toObject();
  //   // Loop through selected fields
  //   for (const [fileAttach, id] of Object.entries(fileIdObject)) {
  //     //handle error when fileId=null 
  //     if(id){
  //       //get file part from file-upload document
  //       const filePath = await FileAttach.findById(id).select("path -_id");
  //       //delete file document      
  //       const file_id = new mongoose.Types.ObjectId(id); 
  //       resultFile = await FileAttach.deleteOne({ _id: file_id });
  //       //delete file in directory
  //       fs.unlinkSync(filePath.path);
  //     } 
  //   }    
  // }
  // //seve file document and file in directory===========================
  // let resultVerifyAttach;
  // let resultEditAttach = [];
  // let resultReissueAttach = [];

  // if (self.service == "verify") {
  //   if (req.files['file_attach1'] == undefined) {
  //     console.log("No file selected!");
  //   } else {
  //     const fileProperties = req.files['file_attach1'][0];
  //     const file = new FileAttach(fileProperties);
  //     const path = "/IDG Data/Project/services-backend/" + file.path;
  //     file.path = path;
  
  //     resultVerifyAttach = await file.save();
  //   }
  // }else if(self.service == "edit"){
  //   for (let index = 1; index <= 6; index++) {
  //     if (req.files[`file_attach${index}`] == undefined) {
  //       console.log("No file selected!");
  //     } else {
  //       const fileProperties = req.files[`file_attach${index}`][0];
  //       const file = new FileAttach(fileProperties);
  //       const path = "/IDG Data/Project/services-backend/" + file.path;
  //       file.path = path;
    
  //       resultEditAttach[index-1] = await file.save();
  //     }
  //   }    
  // }else{    
  //   for (let index = 1; index <= 4; index++) {
  //     if (req.files[`file_attach${index}`] == undefined) {
  //       console.log("No file selected!");
  //     } else {
  //       const fileProperties = req.files[`file_attach${index}`][0];
  //       const file = new FileAttach(fileProperties);
  //       const path = "/IDG Data/Project/services-backend/" + file.path;
  //       file.path = path;
    
  //       resultReissueAttach[index-1] = await file.save();
  //     }
  //   }    
  // }
  // //update service and application======================================
  // let resultApp;
  // //update by change service type
  // if (self.service != service) {
  //   //remove existing service
  //   let resultRemoveService;
  //   if (service == "verify") {
  //     resultRemoveService = await Verify.deleteOne({ _id: serviceTakeId });
  //   } else if (service == "edit") {
  //     resultRemoveService = await Edit.deleteOne({ _id: serviceTakeId });
  //   } else {
  //     resultRemoveService = await Reissue.deleteOne({ _id: serviceTakeId });
  //   }
  //   //add new service
  //   let serviceNew;
  //   if (self.service == "verify") {
  //     serviceNew = new Verify({
  //       verifyByCertType: self.verifyByCertType,
  //       file_attach1: resultVerifyAttach == undefined ? null : new mongoose.Types.ObjectId(resultVerifyAttach._id),
  //     });
  //   } else if (self.service == "edit") {
  //     serviceNew = new Edit({
  //       is_name: self.is_name,
  //       old_name: self.old_name,
  //       new_name: self.new_name,
  //       is_gender: self.is_gender,
  //       old_gender: self.old_gender,
  //       new_gender: self.new_gender,
  //       is_dob: self.is_dob,
  //       old_dob: self.old_dob,
  //       new_dob: self.new_dob,
  //       is_pob: self.is_pob,
  //       old_pob: self.old_pob,
  //       new_pob: self.new_pob,
  //       is_father: self.is_father,
  //       old_father: self.old_father,
  //       new_father: self.new_father,
  //       is_mother: self.is_mother,
  //       old_mother: self.old_mother,
  //       new_mother: self.new_mother,
  //       file_attach1: resultEditAttach[0] == undefined ? null : new mongoose.Types.ObjectId(resultEditAttach[0]._id),
  //       file_attach2: resultEditAttach[1] == undefined ? null : new mongoose.Types.ObjectId(resultEditAttach[1]._id),
  //       file_attach3: resultEditAttach[2] == undefined ? null : new mongoose.Types.ObjectId(resultEditAttach[2]._id),
  //       file_attach4: resultEditAttach[3] == undefined ? null : new mongoose.Types.ObjectId(resultEditAttach[3]._id),
  //       file_attach5: resultEditAttach[4] == undefined ? null : new mongoose.Types.ObjectId(resultEditAttach[4]._id),
  //       file_attach6: resultEditAttach[5] == undefined ? null : new mongoose.Types.ObjectId(resultEditAttach[5]._id),
  //     });
  //   } else {
  //     serviceNew = new Reissue({
  //       file_attach1: resultReissueAttach[0] == undefined ? null : new mongoose.Types.ObjectId(resultReissueAttach[0]._id),
  //       file_attach2: resultReissueAttach[1] == undefined ? null : new mongoose.Types.ObjectId(resultReissueAttach[1]._id),
  //       file_attach3: resultReissueAttach[2] == undefined ? null : new mongoose.Types.ObjectId(resultReissueAttach[2]._id),
  //       file_attach4: resultReissueAttach[3] == undefined ? null : new mongoose.Types.ObjectId(resultReissueAttach[3]._id),
  //     });
  //   }
  //   const resultService = await serviceNew.save();
  //   //update serviceTakeId in table form
  //   updateDocument.$set.serviceTake = resultService._id;
  //   //console.log(updateDocument);
  //   resultApp = await form.updateOne({ _id: id }, updateDocument);
  // } else {
  //   //update serivce
  //   let resultUpdateService;
  //   if (service == "verify") {
  //     //update file_attach in updateDocument
  //     updateDocument.$set.file_attach1 = (resultVerifyAttach == undefined) ? null : new mongoose.Types.ObjectId(resultVerifyAttach._id);
  //     //update verify document
  //     resultUpdateService = await Verify.updateOne(
  //       { _id: serviceTakeId },
  //       updateDocument
  //     );
  //   } else if (service == "edit") {
  //     //update file_attach in updateDocument
  //     updateDocument.$set.file_attach1 = (resultEditAttach[0] == undefined) ? null : new mongoose.Types.ObjectId(resultEditAttach[0]._id),
  //     updateDocument.$set.file_attach2 = (resultEditAttach[1] == undefined) ? null : new mongoose.Types.ObjectId(resultEditAttach[1]._id),
  //     updateDocument.$set.file_attach3 = (resultEditAttach[2] == undefined) ? null : new mongoose.Types.ObjectId(resultEditAttach[2]._id),
  //     updateDocument.$set.file_attach4 = (resultEditAttach[3] == undefined) ? null : new mongoose.Types.ObjectId(resultEditAttach[3]._id),
  //     updateDocument.$set.file_attach5 = (resultEditAttach[4] == undefined) ? null : new mongoose.Types.ObjectId(resultEditAttach[4]._id),
  //     updateDocument.$set.file_attach6 = (resultEditAttach[5] == undefined) ? null : new mongoose.Types.ObjectId(resultEditAttach[5]._id),
  //     //update edit document
  //     resultUpdateService = await Edit.updateOne(
  //       { _id: serviceTakeId },
  //       updateDocument
  //     );
  //   } else {
  //     //update file_attach in updateDocument
  //     updateDocument.$set.file_attach1 = (resultReissueAttach[0] == undefined) ? null : new mongoose.Types.ObjectId(resultReissueAttach[0]._id),
  //     updateDocument.$set.file_attach2 = (resultReissueAttach[1] == undefined) ? null : new mongoose.Types.ObjectId(resultReissueAttach[1]._id),
  //     updateDocument.$set.file_attach3 = (resultReissueAttach[2] == undefined) ? null : new mongoose.Types.ObjectId(resultReissueAttach[2]._id),
  //     updateDocument.$set.file_attach4 = (resultReissueAttach[3] == undefined) ? null : new mongoose.Types.ObjectId(resultReissueAttach[3]._id),
  //     //update edit document
  //     resultUpdateService = await Reissue.updateOne(
  //       { _id: serviceTakeId },
  //       updateDocument
  //     );
  //   }
  //   //update form
  //   resultApp = await form.updateOne({ _id: id }, updateDocument);
  // }
  
  // /////////////////////////////////////////
  // return res.json({ resultApp });
});

module.exports = {
  getForms,
  getForm,
  getFormByUserID,
  deleteFormById,
  createForm,
  updateFormById,
  countForms,
  getQrForm,
};
