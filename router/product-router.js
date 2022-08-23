const express = require("express");
const productRouter = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const { Product } = require('../models/product.model');

const { getAllProducts, getProductById, saveProduct, updateProduct, deleteProduct, getProductByCategory } = require('../controllers/product.controller');

const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');

const { UPLOAD_PRODUCT_FOLDER } = process.env;

multer({ dest: path.join(__dirname, "../") + UPLOAD_PRODUCT_FOLDER });

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../") + UPLOAD_PRODUCT_FOLDER)
    },

    filename: function (req, file, cb) {

        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error(`Please Upload a valid file with ext png or jpg`));
        }

        else {
            Product.isExists(req.body.name, req.body.code, req.body.id).then(isExists => {
                if (isExists) {
                    return cb(new Error(`Product Name or Code already exists !!`));
                } else {
                    let imageName = file.originalname.split('.');
                    cb(null, imageName[0] + '-' + mongoose.Types.ObjectId() + path.extname(file.originalname))
                }
            });
        }

    }

});

const upload = multer({ storage: storage })

productRouter.get('/getAll', getAllProducts);

// productRouter.get('/getById/:id', getProductById);
// productRouter.post('/save', upload.array('images', 5), adminAuthMiddleware, saveProduct);
// productRouter.post('/update', upload.array('images', 5), adminAuthMiddleware, updateProduct);
// productRouter.post('/delete', adminAuthMiddleware, deleteProduct);
// productRouter.get('/getProductByCategory/:categoryId', adminAuthMiddleware, getProductByCategory);


module.exports ={productRouter};