const express = require("express");
const {
  getUser,
  getUsers,
  deleteUserById,
  updateUserByID,
} = require("../controllers/user");
const router = express.Router();
const { authorize } = require("../middlewares");
const { updateUserSchema } = require("../common/validation");
//const upload = require("../middlewares/upload");
//const { uploadFile, getFile } = require("../controllers/user-profile");

//get user by id
router.get("/:id", authorize("user_read_byid"), getUser); //isValidat
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [user]
 *     description: Get an user by ID
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
 *         description: Get an user by ID
 */
//get all user
router.get("/", authorize("user_read_all"), getUsers);
/**
 * @swagger
 * /users:
 *   get:
 *     tags: [user]
 *     description: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all users
 */
//delete user
router.delete("/:id", authorize("user_delete"), deleteUserById);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [user]
 *     description: Delete an user by ID
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
 *         description: Delete an user by ID
 */
router.put("/:id",updateUserSchema , authorize("user_update"), updateUserByID);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [user]
 *     description: Update an user by ID
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:                
 *                gender:
 *                  type: string
 *                dob:
 *                  type: date
 *                address:
 *                  type: string
 *                phone:
 *                  type: string
 *              example:                
 *                gender: "Male"
 *                dob: "01/04/1991"
 *                address: "ភ្នំពេញ"                
 *                phone: "012459678"
 *     responses:
 *       200:
 *         description: Update an user by ID
 */

module.exports = router;
