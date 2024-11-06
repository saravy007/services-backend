const express = require("express");
const {
  getApplicant,
  getApplicants,
  deleteApplicantById,
  createApplicant,
  updateApplicantById,
  getApplicantByUserID,
  countApplicants,
} = require("../controllers/applicant");
const { authorize, resourceControl } = require("../middlewares");
const router = express.Router();

router.get("/count/:id", authorize("app_read_byid"), countApplicants);
/**
 * @swagger
 * /applicant/count/{id}:
 *   get:
 *     tags: [applicant]
 *     description: Count applicants by user ID
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Count applicants by user ID
 */

router.get("/:id", authorize("app_read_byid"), getApplicant);
/**
 * @swagger
 * /applicant/{id}:
 *   get:
 *     tags: [applicant]
 *     description: Get an applicant by ID
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Get an applicant by ID
 */
router.get("/", authorize("app_read_all"), getApplicants);
/**
 * @swagger
 * /applicant:
 *   get:
 *     tags: [applicant]
 *     description: Get all applicants
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all applicants
 */
router.get("/by-user/:id", authorize("app_read_byuser"), getApplicantByUserID);
/**
 * @swagger
 * /applicant/by-user/{id}:
 *   get:
 *     tags: [applicant]
 *     description: Get applicants by user ID
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Get applicants by user ID
 */
router.delete(
  "/:id",
  authorize("app_delete"),
  resourceControl("applicant"),
  deleteApplicantById
);
/**
 * @swagger
 * /applicant/{id}:
 *   delete:
 *     tags: [applicant]
 *     description: Delete an applicant by ID
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Delete an applicant by ID
 */
router.post("/:uid", authorize("app_create"), createApplicant);
/**
 * @swagger
 * paths:
 *  /applicant/{userid}:
 *      post:
 *        tags: [applicant]
 *        description: Create an applicant
 *        security:
 *          - bearerAuth: []
 *        parameters:
 *          - in: path
 *            name: userid
 *            required: true
 *            schema:
 *              type: string
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/verify'
 *                  - $ref: '#/components/schemas/edit'
 *                  - $ref: '#/components/schemas/reissue'
 *              examples:
 *                verify:
 *                  summary: verify certificate
 *                  value:
 *                    name: "សុខ កញ្ញា"
 *                    gender: "ស្រី"
 *                    dob: "01/12/1991"
 *                    address: "ស្វាយរៀង"
 *                    examDate: "2014"
 *                    examCenter: "វិ.ស្វាយរៀង"
 *                    room: 10
 *                    seat: 628
 *                    grade: "C"
 *                    phone: "011256987"
 *                    service: "verify"
 *                    verifyByCertType: "diploma"
 *                    verify_attach1: "D:/hello kanha"
 *                edit:
 *                  summary: edit certificate
 *                  value:
 *                    name: "សុខ កញ្ញា"
 *                    gender: "ស្រី"
 *                    dob: "01/12/1991"
 *                    address: "ស្វាយរៀង"
 *                    examDate: "2014"
 *                    examCenter: "វិ.ស្វាយរៀង"
 *                    room: 10
 *                    seat: 628
 *                    grade: "C"
 *                    phone: "011256987"
 *                    service: "edit"
 *                    is_name: true
 *                    old_name: "សុខ កញ្ញា"
 *                    new_name: "សុខ តារា"
 *                    is_gender: null
 *                    old_gender: null
 *                    new_gender: null
 *                    is_dob: null
 *                    old_dob: null
 *                    new_dob: null
 *                    is_pob: null
 *                    old_pob: null
 *                    new_pob: null
 *                    is_father: null
 *                    old_father: null
 *                    new_father: null
 *                    is_mother: null
 *                    old_mother: null
 *                    new_mother: null
 *                    edit_attach1: "D:/home"
 *                    edit_attach2: "D:/home"
 *                    edit_attach3: "D:/home"
 *                    edit_attach4: null
 *                    edit_attach5: null
 *                    edit_attach6: null
 *                reissue:
 *                  summary: reissue certificate
 *                  value:
 *                    name: "សុខ កញ្ញា"
 *                    gender: "ស្រី"
 *                    dob: "01/12/1991"
 *                    address: "ស្វាយរៀង"
 *                    examDate: "2014"
 *                    examCenter: "វិ.ស្វាយរៀង"
 *                    room: 10
 *                    seat: 628
 *                    grade: "C"
 *                    phone: "011256987"
 *                    service: "reissue"
 *                    reissue_attach1: "D/home"
 *                    reissue_attach2: null
 *                    reissue_attach3: null
 *                    reissue_attach4: null
 *        responses:
 *          200:
 *            description: Returns create an applicant
 * components:
 *    schemas:
 *      verify:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          gender:
 *            type: string
 *          dob:
 *            type: date
 *          address:
 *            type: string
 *          examDate:
 *            type: date
 *          examCenter:
 *            type: string
 *          room:
 *            type: integer
 *          seat:
 *            type: integer
 *          grade:
 *            type: string
 *          phone:
 *            type: string
 *          service:
 *            type: string
 *          verifyByCertType:
 *            type: string
 *          verify_attach1:
 *            type: string
 *        required:
 *          - name
 *          - gender
 *          - dob
 *          - examDate
 *      edit:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          gender:
 *            type: string
 *          dob:
 *            type: date
 *          address:
 *            type: string
 *          examDate:
 *            type: date
 *          examCenter:
 *            type: string
 *          room:
 *            type: integer
 *          seat:
 *            type: integer
 *          grade:
 *            type: string
 *          phone:
 *            type: string
 *          service:
 *            type: string
 *          is_name:
 *            type: boolean
 *          old_name:
 *            type: string
 *          new_name:
 *            type: string
 *          is_gender:
 *            type: boolean
 *          old_gender:
 *            type: string
 *          new_gender:
 *            type: string
 *          is_dob:
 *            type: boolean
 *          old_dob:
 *            type: date
 *          new_dob:
 *            type: Date
 *          is_pob:
 *            type: boolean
 *          old_pob:
 *            type: string
 *          new_pob:
 *            type: string
 *          is_father:
 *            type: boolean
 *          old_father:
 *            type: string
 *          new_father:
 *            type: string
 *          is_mother:
 *            type: boolean
 *          old_mother:
 *            type: string
 *          new_mother:
 *            type: string
 *          edit_attach1:
 *            type: string
 *          edit_attach2:
 *            type: string
 *          edit_attach3:
 *            type: string
 *          edit_attach4:
 *            type: string
 *          edit_attach5:
 *            type: string
 *          edit_attach6:
 *            type: string
 *        required:
 *          - name
 *          - gender
 *          - dob
 *          - examDate
 *      reissue:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          gender:
 *            type: string
 *          dob:
 *            type: date
 *          address:
 *            type: string
 *          examDate:
 *            type: date
 *          examCenter:
 *            type: string
 *          room:
 *            type: integer
 *          seat:
 *            type: integer
 *          grade:
 *            type: string
 *          phone:
 *            type: string
 *          service:
 *            type: string
 *          reissue_attach1:
 *            type: string
 *          reissue_attach2:
 *            type: string
 *          reissue_attach3:
 *            type: string
 *          reissue_attach4:
 *            type: string
 *        required:
 *          - name
 *          - gender
 *          - dob
 *          - examDate
 */
router.put(
  "/:id",
  authorize("app_update"),
  resourceControl("applicant"),
  updateApplicantById
);
/**
 * @swagger
 * /applicant/{id}:
 *   put:
 *     tags: [applicant]
 *     description: Update an applicant by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/verify'
 *                  - $ref: '#/components/schemas/edit'
 *                  - $ref: '#/components/schemas/reissue'
 *              examples:
 *                verify:
 *                  summary: verify certificate
 *                  value:
 *                    name: "សុខ កញ្ញា"
 *                    gender: "ស្រី"
 *                    dob: "01/12/1991"
 *                    address: "ស្វាយរៀង"
 *                    examDate: "2014"
 *                    examCenter: "វិ.ស្វាយរៀង"
 *                    room: 10
 *                    seat: 628
 *                    grade: "C"
 *                    phone: "011256987"
 *                    service: "verify"
 *                    verifyByCertType: "diploma"
 *                    verify_attach1: "D:/hello kanha"
 *                edit:
 *                  summary: edit certificate
 *                  value:
 *                    name: "សុខ កញ្ញា"
 *                    gender: "ស្រី"
 *                    dob: "01/12/1991"
 *                    address: "ស្វាយរៀង"
 *                    examDate: "2014"
 *                    examCenter: "វិ.ស្វាយរៀង"
 *                    room: 10
 *                    seat: 628
 *                    grade: "C"
 *                    phone: "011256987"
 *                    service: "edit"
 *                    is_name: true
 *                    old_name: "សុខ កញ្ញា"
 *                    new_name: "សុខ តារា"
 *                    is_gender: null
 *                    old_gender: null
 *                    new_gender: null
 *                    is_dob: null
 *                    old_dob: null
 *                    new_dob: null
 *                    is_pob: null
 *                    old_pob: null
 *                    new_pob: null
 *                    is_father: null
 *                    old_father: null
 *                    new_father: null
 *                    is_mother: null
 *                    old_mother: null
 *                    new_mother: null
 *                    edit_attach1: "D:/home"
 *                    edit_attach2: "D:/home"
 *                    edit_attach3: "D:/home"
 *                    edit_attach4: null
 *                    edit_attach5: null
 *                    edit_attach6: null
 *                reissue:
 *                  summary: reissue certificate
 *                  value:
 *                    name: "សុខ កញ្ញា"
 *                    gender: "ស្រី"
 *                    dob: "01/12/1991"
 *                    address: "ស្វាយរៀង"
 *                    examDate: "2014"
 *                    examCenter: "វិ.ស្វាយរៀង"
 *                    room: 10
 *                    seat: 628
 *                    grade: "C"
 *                    phone: "011256987"
 *                    service: "reissue"
 *                    reissue_attach1: "D/home"
 *                    reissue_attach2: null
 *                    reissue_attach3: null
 *                    reissue_attach4: null
 *     responses:
 *       200:
 *         description: Update an applicant by ID
 */
module.exports = router;
