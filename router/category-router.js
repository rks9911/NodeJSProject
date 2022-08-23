const express = require("express");
const categoryRouter = express.Router();

const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const { Category } = require('../models/category.model');
// const cors = require('cors');
// app.use(cors());

const { getAllCategorys, getCategoryById, saveCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');



const { UPLOAD_CATEGORY_FOLDER } = process.env;
multer({ dest: path.join(__dirname, "../") + UPLOAD_CATEGORY_FOLDER });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../") + UPLOAD_CATEGORY_FOLDER)
    },
    filename: function (req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error(`Please Upload a valid file with ext png or jpg`));
        } else {
            console.log(req.body);
            Category.isExists(req.body.name, req.body.id).then(isExists => {
                if (isExists) {
                    return cb(new Error(`Category Name ${req.body.name} already exists !!`));
                } else {
                    let imageName = file.originalname.split('.');
                    cb(null, imageName[0] + '-' + mongoose.Types.ObjectId() + path.extname(file.originalname))
                }
            });
        }
    }
})
const upload = multer({ storage: storage })


categoryRouter.get('/getAll', getAllCategorys);
categoryRouter.get('/getById/:id', getCategoryById);
categoryRouter.post('/save', upload.single('image'), adminAuthMiddleware, saveCategory);
categoryRouter.post('/update', upload.single('image'), adminAuthMiddleware, updateCategory);
categoryRouter.post('/delete', adminAuthMiddleware, deleteCategory);

module.exports = categoryRouter;