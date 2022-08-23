const express = require("express");
const tagRouter = express.Router();

const { getAllTags, getTagById, saveTag, updateTag, deleteTag } = require('../controllers/tag.controller');
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');


/**
 * @swagger
 * /api/tags/getAll:
 *   get:
 *     description: get all tags
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
tagRouter.get('/getAll', getAllTags);

tagRouter.get('/getById/:id', getTagById);

tagRouter.post('/save',adminAuthMiddleware, saveTag);

tagRouter.post('/update',adminAuthMiddleware, updateTag);

tagRouter.post('/delete',adminAuthMiddleware, deleteTag);

module.exports = {tagRouter};
