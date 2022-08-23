const express = require("express");
const usertypeRouter = express.Router();

const { getAllUserTypes, getUserTypeById, saveUserType, updateUserType, deleteUserType } = require('../controllers/usertype.controller');
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');

usertypeRouter.get('/getAll', getAllUserTypes);
usertypeRouter.get('/getById/:id', getUserTypeById);
usertypeRouter.post('/save',adminAuthMiddleware, saveUserType);
usertypeRouter.post('/update',adminAuthMiddleware, updateUserType);
usertypeRouter.post('/delete',adminAuthMiddleware, deleteUserType);

module.exports = {usertypeRouter};