const express = require("express");
const shop = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const {shopfileuploads, getAllMultiFiles, getByIDMultiFiles, getRemoveByIDMultiFiles, updateFilesUploads} = require('../controllers/shop.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, 'uploads/')

        cb(null,'uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Math.round(Math.random() * 1E9)
      
        // cb(null, Date.now() + uniqueSuffix + path.extname(file.originalname))

        cb(null, + uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

shop.post('/fileupload', upload.array('files', 5),  shopfileuploads);

shop.get('/fileuploadlist',  getAllMultiFiles);
shop.get('/filesbyid/:id',  getByIDMultiFiles);
shop.get('/filesremovebyid/:id', getRemoveByIDMultiFiles);
shop.post('/updatefileupload', upload.array('files', 50),  updateFilesUploads);


// shop.post('/updatefileupload', upload.array('files', 50),  updateFilesUploads);
// shop.get('/filesbyid/:id',  getByIDMultiFiles);
// shop.get('/filesremovebyid/:id', getRemoveByIDMultiFiles);

module.exports = shop;
