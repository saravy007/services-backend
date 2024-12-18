const express = require("express");
const {getQrForm} = require("../controllers/form");
const router = express.Router();

router.get("/:id", getQrForm);
/**
 * @swagger
 * /qr-scan/{id}:
 *   get:
 *     tags: [qr-scan]
 *     description: Get form status by ID
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Get form status by ID
 */
module.exports = router;
