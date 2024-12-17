const expressAsyncHandler = require("express-async-handler");
const fs = require("fs");
const { FileAttach } = require("../models/file-attach");

const uploadFile = expressAsyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({ message: 'No file uploaded. Please select a file.' });
  }
  const userid = req.params.userid;
  const formid = req.params.formid;

  const uploadedFiles = req.files.map(file => ({
    byUser: userid,
    byform: formid,
    originalname: file.originalname,
    path: process.env.FILE_PATH + file.path,
    filename: file.filename,
    size: file.size,
    encoding: file.encoding,
  }));

  let result;
  // const fileAttach = await FileAttach.find({ byUser: userid, byform: formid });
  // if (fileAttach.length > 0) {
  //   //delete old record from db
  //   const resultDelete = await FileAttach.deleteMany({ byUser: userid, byform: formid });
  //   //delete image profile in directory
  //   for (let i = 0; i < fileAttach.length; i++) {
  //     fs.unlinkSync(fileAttach[i].path);
  //   }    
  //   //save new record in db
  //   for (let j = 0; j < uploadedFiles.length; j++) {     
  //     const file = new FileAttach(uploadedFiles[j]);       
  //     result = await file.save();
  //   }    
  // }else{
  for (let index = 0; index < uploadedFiles.length; index++) {
    const file = new FileAttach(uploadedFiles[index]);
    result = await file.save();
  }
  // }
  return res.json(result);  
});

const deleteFile = expressAsyncHandler(async (req, res) => {
  const userid = req.params.userid;
  const id = req.params.id;

  const fileAttach = await FileAttach.findOne({ byUser: userid, _id: id });
  let resultDelete
  if(fileAttach){
    //delete record from db
    resultDelete = await FileAttach.deleteOne({ _id: id });
    //delete image profile in directory
    fs.unlinkSync(fileAttach.path);
  }else{
    return res.status(400).send({ message: 'No file to delete.' });
  }
  return res.json(resultDelete);
});

const getFiles = expressAsyncHandler(async (req, res) => {
  const userid = req.params.userid;
  const formid = req.params.formid;
  const files = await FileAttach.find({ byUser: userid, byform: formid });
  return res.json(files);
});

const getFile = expressAsyncHandler(async (req, res) => {
  const userid = req.params.userid;
  const id = req.params.id;
  const file = await FileAttach.findOne({ byUser: userid, _id: id });
  return res.sendFile(file.path);
});

module.exports = { uploadFile, getFile, getFiles ,deleteFile };
