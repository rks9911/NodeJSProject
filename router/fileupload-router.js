const express = require("express");
const fileuploadRouter = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const {savedata} = require('../controllers/fileupload.controller');

const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');

const { UPLOAD_BRANDLOGO_FOLDER } = process.env;

multer({ dest: path.join(__dirname, "../") + UPLOAD_BRANDLOGO_FOLDER });

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, "../") + UPLOAD_BRANDLOGO_FOLDER)
//     },
//     filename: function (req, file, cb) {
//         if (!file.originalname.match(/\.(png|jpg)$/)) {
//             return cb(new Error(`Please Upload a valid file with ext png or jpg`));

           
//         } 

//         // let imageName = file.originalname.split('.');
//         // cb(null, imageName[0] + '-' + mongoose.Types.ObjectId() + path.extname(file.originalname))
    

//         // else {
//         //     fileupload.isExists(req.body.name, req.body.id).then(isExists => {
//         //         if(isExists){
//         //             return cb(new Error(`Brandlogo Name ${req.body.name} already exists !!`));
//         //         } else {
//         //             let imageName = file.originalname.split('.');
//         //             cb(null, imageName[0] + '-' + mongoose.Types.ObjectId() + path.extname(file.originalname))
//         //         }
//         //     });
//         // }
//     }
// })

// const upload = multer({ storage: storage })


fileuploadRouter.post('/save', upload.single('image'), adminAuthMiddleware, savedata);

module.exports = fileuploadRouter;