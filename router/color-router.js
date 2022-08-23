const express = require("express");
const colorRouter = express.Router();

const { getAllColors, getColorById, saveColor, updateColor, deleteColor } = require('../controllers/color.controller');
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');

colorRouter.get('/getAll', getAllColors);
colorRouter.get('/getById/:id', getColorById);
colorRouter.post('/save',adminAuthMiddleware, saveColor);
colorRouter.post('/update',adminAuthMiddleware, updateColor);
colorRouter.post('/delete',adminAuthMiddleware, deleteColor);

module.exports = {colorRouter};