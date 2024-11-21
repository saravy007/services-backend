const express = require("express");
const { uploadFile, getFile } = require("../controllers/user-profile");
const upload = require("../middlewares/upload");
const { authorize } = require("../middlewares");
const userProfileRouter = express.Router();

userProfileRouter.post(
  "/:uid",
  authorize("profile_upload_byuser"),
  upload,
  uploadFile
);
/**
 * @swagger
 * /user-profile/{userid}:
 *   post:
 *     tags: [user-profile]
 *     description: Upload user profile.
 *     security:
 *      - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: file
 *     responses:
 *       200:
 *         description: User profile uploaded successfully
 */
userProfileRouter.get("/:uid", authorize("profile_read_byuser"), getFile);
/**
 * @swagger
 * /user-profile/{userid}:
 *   get:
 *     tags: [user-profile]
 *     description: Get an user profile by user id
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
 *         description: Get an user profile by user id
 */

module.exports = userProfileRouter;
