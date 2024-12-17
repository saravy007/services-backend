const express = require("express");
const { uploadFile, getFile, getFiles, deleteFile } = require("../controllers/file-attach");
const { fileUpload } = require("../middlewares/file-attach");
const { authorize } = require("../middlewares");
const fileAttachRouter = express.Router();

fileAttachRouter.post("/:userid/:formid", authorize("attach_upload"), fileUpload, uploadFile);
/**
 * @swagger
 * /file-attach/{userid}/{formid}:
 *   post:
 *     tags: [form-file-attach]
 *     description: Upload file attach.
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: formid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: file
 *     responses:
 *       200:
 *         description: File attach uploaded successfully
 */
fileAttachRouter.delete("/:userid/:id", authorize("attach_delete"), deleteFile);
/**
 * @swagger
 * /file-attach/{userid}/{id}:
 *   delete:
 *     tags: [form-file-attach]
 *     description: Delete a file attach by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delete a file attach by ID
 */
fileAttachRouter.get("/files/:userid/:formid", authorize("attach_read"), getFiles);
/**
 * @swagger
 * /file-attach/files/{userid}/{formid}:
 *    get:
 *      tags: [form-file-attach]
 *      description: Get files by user id and application id
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: userid
 *          required: true
 *          schema:
 *            type: string
 *        - in: path
 *          name: formid
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Get files by user id and application id
 */
fileAttachRouter.get("/:userid/:id", authorize("attach_read"), getFile);
/**
 * @swagger
 * /file-attach/{userid}/{id}:
 *    get:
 *      tags: [form-file-attach]
 *      description: Get an file attach by user id and application id
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: userid
 *          required: true
 *          schema:
 *            type: string
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Get an file attach by user id and application id
 */

module.exports = fileAttachRouter;
