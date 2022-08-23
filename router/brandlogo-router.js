const express = require("express");
const brandlogoRouter = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const { BrandLogo } = require('../models/brandlogo.model');// comment to check generate logfile

const {
    getAllBrandLogos,
    getBrandLogoById,
    saveBrandLogo,
    updateBrandLogo,
    deleteBrandLogo
} = require('../controllers/brandlogo.controller');
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');



const { UPLOAD_BRANDLOGO_FOLDER } = process.env;


//const createDir = multer({ dest: UPLOAD_BRANDLOGO_FOLDER });

//console.log(__dirname);
//console.log(path.join(__dirname, "../") + UPLOAD_BRANDLOGO_FOLDER);
multer({ dest: path.join(__dirname, "../") + UPLOAD_BRANDLOGO_FOLDER });


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         //cb(null, UPLOAD_BRANDLOGO_FOLDER)
//         cb(null, path.join(__dirname, "../") + UPLOAD_BRANDLOGO_FOLDER)
//     },
//     filename: function (req, file, cb) {
//         //console.log(file);
//         let imageName = file.originalname.split('.');
//         //cb(null, imageName[0] + '-' + Date.now() + ".png")
//         //cb(null, imageName[0] + '-' + mongoose.Types.ObjectId() + ".png")
//         //cb(null, imageName[0] + '-' + mongoose.Types.ObjectId() +  imageName[1] )
//         cb(null, imageName[0] + '-' + mongoose.Types.ObjectId() + path.extname(file.originalname))
//     }
// })




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../") + UPLOAD_BRANDLOGO_FOLDER)
    },
    filename: function (req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error(`Please Upload a valid file with ext png or jpg`));
        } else {
            BrandLogo.isExists(req.body.name, req.body.id).then(isExists => {
                if(isExists){
                    return cb(new Error(`Brandlogo Name ${req.body.name} already exists !!`));
                } else {
                    let imageName = file.originalname.split('.');
                    cb(null, imageName[0] + '-' + mongoose.Types.ObjectId() + path.extname(file.originalname))
                }
            });
        }
    }
})

const upload = multer({ storage: storage })


brandlogoRouter.get('/getAll', getAllBrandLogos);
brandlogoRouter.get('/getById/:id', getBrandLogoById);
brandlogoRouter.post('/save', upload.single('image'), adminAuthMiddleware, saveBrandLogo);
brandlogoRouter.post('/update', upload.single('image'), adminAuthMiddleware, updateBrandLogo);
brandlogoRouter.post('/delete', adminAuthMiddleware, deleteBrandLogo);

module.exports = brandlogoRouter;