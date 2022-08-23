const express = require("express");
const registerRouter = express.Router();

const { addRegister}=require('../controllers/register.controller');

registerRouter.post('/', addRegister);

//const { Promise } = require('mongoose');

module.exports =  registerRouter 