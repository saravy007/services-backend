const bcrypt = require("bcrypt");
const dbConnect = require("./database/mongo_db");
const User = require("./models/user");
const { faker } = require("@faker-js/faker");
const Applicant = require("./models/applicant");
const Verify = require("./models/verify");
const Edit = require("./models/edit");
const Reissue = require("./models/reissue");
dbConnect().catch((err) => {
  console.log(err);
});

const numUser = 10;
const numApplicant = 10;

// Generate fake data
async function generate() {
  //generate User data
  let userList = [];
  for (let i = 0; i < numUser; i++) {
    const user = new User({
      username: faker.internet.userName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      password: await bcrypt.hash("12345678", 10),
      role: i == 0 ? "admin" : i == 1 ? "front" : "user",
    });
    const result = await user.save();
    if (result.role == "user") {
      userList.push(result._id);
    }
    console.log(`User: ${result.name} generated!`);
  }
  //generate services data
  // for (let i = 0; i < numServices; i++) {
  //   if (i == 0) {
  //     const service = new Services({
  //       id: 1,
  //       desc: "verify",
  //     });
  //     const reuslt = await service.save();
  //     console.log(`Services: ${reuslt.desc} generated!`);
  //   } else if (i == 1) {
  //     const service = new Services({
  //       id: 2,
  //       desc: "edit",
  //     });
  //     const reuslt = await service.save();
  //     console.log(`Services: ${reuslt.desc} generated!`);
  //   } else {
  //     const service = new Services({
  //       id: 3,
  //       desc: "reissue",
  //     });
  //     const reuslt = await service.save();
  //     console.log(`Services: ${reuslt.desc} generated!`);
  //   }
  // }
  //generate certificate type data
  // for (let i = 0; i < numCertificateType; i++) {
  //   if (i == 0) {
  //     const certType = new CertificateType({
  //       id: 1,
  //       desc: "diploma",
  //     });
  //     const reuslt = await certType.save();
  //     console.log(`certificate type: ${reuslt.desc} generated!`);
  //   } else if (i == 1) {
  //     const certType = new CertificateType({
  //       id: 2,
  //       desc: "temp_cert",
  //     });
  //     const reuslt = await certType.save();
  //     console.log(`certificate Type: ${reuslt.desc} generated!`);
  //   } else {
  //     const certType = new CertificateType({
  //       id: 3,
  //       desc: "graduate_cert",
  //     });
  //     const reuslt = await certType.save();
  //     console.log(`certificate Type: ${reuslt.desc} generated!`);
  //   }
  // }
  //generate applicant and service take data
  let gradeList = ["A", "B", "C", "D", "E", "F"];
  let serviceId = "";
  for (let i = 0; i < numApplicant; i++) {
    let indexService = faker.number.int({ min: 1, max: 3 });
    let indexCert = faker.number.int({ min: 1, max: 3 });
    let boleanList = [true, false];
    let isName = boleanList[Math.floor(Math.random() * boleanList.length)];
    let isGender = boleanList[Math.floor(Math.random() * boleanList.length)];
    let isDob = boleanList[Math.floor(Math.random() * boleanList.length)];
    let isPob = boleanList[Math.floor(Math.random() * boleanList.length)];
    let isFather = boleanList[Math.floor(Math.random() * boleanList.length)];
    let isMother = boleanList[Math.floor(Math.random() * boleanList.length)];
    //////////////////////
    if (indexService == 1) {
      const verify = new Verify({
        verifyByCertType:
          indexCert == 1
            ? "diploma"
            : indexCert == 2
            ? "temp_cert"
            : "graduate_cert",
        verify_attach1: "",
      });
      const reusltVerify = await verify.save();
      serviceId = reusltVerify._id;
      console.log(`ServiceVerify: ${reusltVerify._id} generated!`);
    }
    //////////////////////
    if (indexService == 2) {
      const edit = new Edit({
        is_name: indexService == 2 ? isName : false,
        old_name: (indexService == 2) & isName ? faker.internet.userName() : "",
        new_name: (indexService == 2) & isName ? faker.internet.userName() : "",
        is_gender: indexService == 2 ? isGender : false,
        old_gender: (indexService == 2) & isGender ? faker.person.gender() : "",
        new_gender: (indexService == 2) & isGender ? faker.person.gender() : "",
        is_dob: indexService == 2 ? isDob : false,
        old_dob: (indexService == 2) & isDob ? faker.date.anytime() : "",
        new_dob: (indexService == 2) & isDob ? faker.date.anytime() : "",
        is_pob: indexService == 2 ? isPob : false,
        old_pob: (indexService == 2) & isPob ? faker.location.city() : "",
        new_pob: (indexService == 2) & isPob ? faker.location.city() : "",
        is_father: indexService == 2 ? isFather : false,
        old_father:
          (indexService == 2) & isFather ? faker.internet.userName() : "",
        new_father:
          (indexService == 2) & isFather ? faker.internet.userName() : "",
        is_mother: indexService == 2 ? isMother : false,
        old_mother:
          (indexService == 2) & isMother ? faker.internet.userName() : "",
        new_mother:
          (indexService == 2) & isMother ? faker.internet.userName() : "",
        edit_attach1: "",
        edit_attach2: "",
        edit_attach3: "",
        edit_attach4: "",
        edit_attach5: "",
        edit_attach6: "",
      });
      const reusltEdit = await edit.save();
      serviceId = reusltEdit._id;
      console.log(`ServiceEdit: ${reusltEdit._id} generated!`);
    }
    ////////////////////////
    if (indexService == 3) {
      const reissue = new Reissue({
        reissue_attach1: "",
        reissue_attach2: "",
        reissue_attach3: "",
        reissue_attach4: "",
      });
      const reusltReissue = await reissue.save();
      serviceId = reusltReissue._id;
      console.log(`ServiceReissue: ${reusltReissue._id} generated!`);
    }
    ///////////////////////
    const randomId = userList[Math.floor(Math.random() * userList.length)];
    const randomGrade = gradeList[Math.floor(Math.random() * gradeList.length)];
    const applicant = new Applicant({
      byUser: randomId,
      name: faker.internet.userName(),
      gender: faker.person.gender(),
      dob: faker.date.anytime(),
      address: faker.location.secondaryAddress(),
      examDate: faker.date.anytime(),
      examCenter: faker.location.city(),
      room: faker.number.int({ max: 100 }),
      seat: faker.number.int({ max: 1000 }),
      grade: randomGrade,
      phone: faker.phone.number(),
      service:
        indexService == 1 ? "verify" : indexService == 2 ? "edit" : "reissue",
      serviceTake: serviceId,
      status: faker.number.int({ max: 3 }),
    });
    const reusltApp = await applicant.save();
    console.log(`Applicant: ${reusltApp.name} generated!`);
  }
}
generate();
