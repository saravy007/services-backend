const express = require("express");
const {
  getForm,
  getForms,
  deleteFormById,
  createForm,
  updateFormById,
  getFormByUserID,
  countForms,
} = require("../controllers/form");
const { authorize, resourceControl } = require("../middlewares");
const {fileUpload} = require("../middlewares/file-attach");
const { formSchema } = require("../common/validation");
const router = express.Router();

router.get("/count/:userid", authorize("form_read_byid"), countForms);
/**
 * @swagger
 * /form/count/{userid}:
 *   get:
 *     tags: [form]
 *     description: Count forms by user ID
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: userid
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Count forms by user ID
 */
router.get("/:id", authorize("form_read_byid"), getForm);
/**
 * @swagger
 * /form/{id}:
 *   get:
 *     tags: [form]
 *     description: Get an form by ID
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
 *         description: Get an form by ID
 */
router.get("/", authorize("form_read_all"), getForms);
/**
 * @swagger
 * /form:
 *   get:
 *     tags: [form]
 *     description: Get all forms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all forms
 */
router.get("/by-user/:id", authorize("form_read_byuser"), getFormByUserID);
/**
 * @swagger
 * /form/by-user/{id}:
 *   get:
 *     tags: [form]
 *     description: Get forms by user ID
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
 *         description: Get forms by user ID
 */
router.delete("/:id", authorize("form_delete"), resourceControl("form"), deleteFormById);
/**
 * @swagger
 * /form/{id}:
 *   delete:
 *     tags: [form]
 *     description: Delete an form by ID
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
 *         description: Delete an form by ID
 */
router.post("/:userid", formSchema, authorize("form_create"), createForm);
/**
 * @swagger
 * paths:
 *  /form/{userid}:
 *      post:
 *        tags: [form]
 *        description: Create an form
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
 *                    examDate: "12/07/2014"
 *                    examCenter: "វិ.បាក់ទូក"
 *                    room: 12
 *                    seat: 125
 *                    grade: "B"
 *                    percentile: 90.242                   
 *                    service: "verify"
 *                    verify:
 *                      verifyByCertType: "diploma"
 *                edit:
 *                  summary: edit certificate
 *                  value:
 *                    examDate: "12/07/2014"
 *                    examCenter: "វិ.បាក់ទូក"
 *                    room: 12
 *                    seat: 125
 *                    grade: "B"
 *                    percentile: 90.242                    
 *                    service: "edit"
 *                    edit:
 *                      is_name: true
 *                      old_name: "សុខ កញ្ញា"
 *                      new_name: "សុខ តារា"
 *                      is_gender: false
 *                      old_gender: ""
 *                      new_gender: ""
 *                      is_dob: false
 *                      old_dob: ""
 *                      new_dob: ""
 *                      is_pob: false
 *                      old_pob: ""
 *                      new_pob: ""
 *                      is_father: false
 *                      old_father: ""
 *                      new_father: ""
 *                      is_mother: false
 *                      old_mother: ""
 *                      new_mother: ""
 *                reissue:
 *                  summary: reissue certificate
 *                  value: 
 *                    examDate: "12/07/2014"
 *                    examCenter: "វិ.បាក់ទូក"
 *                    room: 12
 *                    seat: 125
 *                    grade: "B"
 *                    percentile: 90.242                    
 *                    service: "reissue"
 *        responses:
 *          200:
 *            description: Returns create an form
 * components:
 *    schemas:
 *      verify:
 *        type: object
 *        properties: 
 *          examDate:
 *            type: date
 *          examCenter:
 *            type: string
 *          room:
 *            type: number  
 *          seat:
 *            type: number
 *          grade:
 *            type: string
 *          percentile:
 *            type: number
 *            format: float       
 *          service:
 *            type: string
 *          verify:
 *            $ref: '#/components/schemas/verify_info'     
 *      verify_info:
 *        type: boject
 *        properties:
 *          verifyByCertType:
 *              type: string
 *      edit:
 *        type: object
 *        properties:   
 *          examDate:
 *            type: date
 *          examCenter:
 *            type: string
 *          room:
 *            type: number  
 *          seat:
 *            type: number
 *          grade:
 *            type: string
 *          percentile:
 *            type: number
 *            format: float       
 *          service:
 *            type: string
 *          edit:
 *            $ref: '#/components/schemas/edit_info'  
 *      edit_info:
 *        type: boject
 *        properties:
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
 *      reissue:
 *        type: object
 *        properties:  
 *          examDate:
 *            type: date
 *          examCenter:
 *            type: string
 *          room:
 *            type: number  
 *          seat:
 *            type: number
 *          grade:
 *            type: string
 *          percentile:
 *            type: number
 *            format: float        
 *          service:
 *            type: string
 */
router.put("/:id", authorize("form_update"), resourceControl("form"), updateFormById);
/**
 * @swagger
 * /form/{id}:
 *   put:
 *     tags: [form]
 *     description: Update an form by ID
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
 *                    examDate: "12/07/2014"
 *                    examCenter: "វិ.បាក់ទូក"
 *                    room: 12
 *                    seat: 125
 *                    grade: "B"
 *                    percentile: 90.242                   
 *                    service: "verify"
 *                    verify:
 *                      verifyByCertType: "diploma"
 *                edit:
 *                  summary: edit certificate
 *                  value:     
 *                    examDate: "12/07/2014"
 *                    examCenter: "វិ.បាក់ទូក"
 *                    room: 12
 *                    seat: 125
 *                    grade: "B"
 *                    percentile: 90.242               
 *                    service: "edit"
 *                    edit:
 *                      is_name: true
 *                      old_name: "សុខ កញ្ញា"
 *                      new_name: "សុខ តារា"
 *                      is_gender: null
 *                      old_gender: null
 *                      new_gender: null
 *                      is_dob: null
 *                      old_dob: null
 *                      new_dob: null
 *                      is_pob: null
 *                      old_pob: null
 *                      new_pob: null
 *                      is_father: null
 *                      old_father: null
 *                      new_father: null
 *                      is_mother: null
 *                      old_mother: null
 *                      new_mother: null
 *                reissue:
 *                  summary: reissue certificate
 *                  value:    
 *                    examDate: "12/07/2014"
 *                    examCenter: "វិ.បាក់ទូក"
 *                    room: 12
 *                    seat: 125
 *                    grade: "B"
 *                    percentile: 90.242                
 *                    service: "reissue"
 *     responses:
 *       200:
 *         description: Update an form by ID
 */
module.exports = router;
