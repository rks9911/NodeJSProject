const express = require("express");
const multiplefilesuploadRouter = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const {multipleFilesUploads,getAllMultiFiles,getByIDMultiFiles,getRemoveByIDMultiFiles, updateFilesUploads} = require('../controllers/mulplefileUploads.controller');

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

multiplefilesuploadRouter.post('/fileupload', upload.array('files', 50),  multipleFilesUploads);
multiplefilesuploadRouter.post('/updatefileupload', upload.array('files', 50),  updateFilesUploads);
multiplefilesuploadRouter.get('/fileuploadlist',  getAllMultiFiles);
multiplefilesuploadRouter.get('/filesbyid/:id',  getByIDMultiFiles);
multiplefilesuploadRouter.get('/filesremovebyid/:id', getRemoveByIDMultiFiles);
module.exports = multiplefilesuploadRouter;