const express = require("express");
const sizeRouter = express.Router();

const { getAllSizes, getSizeById, saveSize, updateSize, deleteSize } = require('../controllers/size.controller');
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');


/**
 * @swagger
 * /api/sizes/getAll:
 *   get:
 *     description: get all sizes
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
sizeRouter.get('/getAll', getAllSizes);


/**
 * @swagger
 * /api/sizes/getById/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The size ID.
 *     description: Get a size by id
 *     responses:
 *       200:
 *         description: Returns the requested size
 */
sizeRouter.get('/getById/:id', getSizeById);


 /**
  * @swagger
  * /api/sizes/save:
  *   post:
  *     parameters:
  *      - in: body
  *        name: size
  *        description: New Size
  *        schema:
  *          type: object
  *          properties:
  *            name:
  *              type: string
  *     responses:
  *       201:
  *         description: Created
  */
sizeRouter.post('/save', adminAuthMiddleware, saveSize);


/**
  * @swagger
  * /api/sizes/update:
  *   post:
  *     parameters:
  *      - in: body
  *        name: Size
  *        description: Update Size
  *        schema:
  *          type: object
  *          properties:
  *            id:
  *              type: string
  *            name:
  *              type: string
  *     responses:
  *       201:
  *         description: Updated
  */
sizeRouter.post('/update', adminAuthMiddleware, updateSize);


/**
  * @swagger
  * /api/sizes/delete:
  *   post:
  *     parameters:
  *      - in: body
  *        name: Size
  *        description: Delete Size
  *        schema:
  *          type: object
  *          properties:
  *            id:
  *              type: string
  *     responses:
  *       201:
  *         description: Deleted
  */
sizeRouter.post('/delete', adminAuthMiddleware, deleteSize);

module.exports = { sizeRouter };