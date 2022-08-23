const express = require("express");
const products = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const {multipleFilesUploads} = require('../controllers/products.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Math.round(Math.random() * 1E9)
      
        cb(null, Date.now() + uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage }); 

products.post('/fileupload', upload.array('files', 50),  produstUploads);
module.exports = products;
