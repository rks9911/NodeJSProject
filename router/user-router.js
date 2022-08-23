const express = require("express");
const userRouter = express.Router();

const { addUser, loginUser, updateProfile, getAllUser, updateUserById, deleteUser } = require('../controllers/user.controller');
const { userAuthMiddleware, adminAuthMiddleware } = require('../middlewares/user.auth.middleware')


//For Employee Role
userRouter.post('/', addUser);
userRouter.post('/login', loginUser);
userRouter.put('/', userAuthMiddleware, updateProfile);//pending

//For Admin Role
//userRouter.get('/', getAllUser);
 userRouter.get('/', adminAuthMiddleware, getAllUser);
userRouter.put('/:id', adminAuthMiddleware, updateUserById);//pending
userRouter.put('/delete/:id', adminAuthMiddleware, deleteUser); //pending

module.exports = { userRouter };