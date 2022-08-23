const express = require("express");
const contactusRouter = express.Router();

const { addContactUs}=require('../controllers/contactus.controller');

contactusRouter.post('/', addContactUs);

//const { Promise } = require('mongoose');

module.exports =  contactusRouter ;