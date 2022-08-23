const { Product } = require('../models/product.model');
const Joi = require('joi');
const _ = require('underscore');
const { UPLOAD_BRANDLOGO_FOLDER } = process.env;

const getAllProducts = async (req, res, next) => {
    const limit = Number.parseInt(req.query.pageproduct) || 5;
    const page = Number.parseInt(req.query.page) || 1;
    const sort_by = req.query.sort;
    const skip = limit * (page - 1);
    let count = 0;

    const products = await Product.find({ isActive: true }).sort(sort_by).skip(skip).limit(limit);
    count = await Product.countDocuments();
    if (products) {
        res.json({ products, count });
    } else {
        res.status(400);
        return next(new Error('No Record Found !!'));
    }
}

const getProductById = async (req, res, next) => {
    const _id = req.params.id;
    console.log(_id);
    const product = await Product.findOne({ _id, isActive: true }, {});
    if (product) {
        res.json({ product });
    } else {
        res.status(400);
        return next(new Error('No Record Found !!'));
    }
}


const saveProduct = async (req, res, next) => {
    if (!req.files || _.isEmpty(req.files)) {
        res.status(400);
        return next(new Error("No file uploaded"));
    }

    console.log(req.files.length);

    if (req.files.length < 5) {
        res.status(400);
        return next(new Error("Please upload 5 images per product"));
    }

    let imagePath = [];
    for (const file of req.files) {
        imagePath.push(UPLOAD_BRANDLOGO_FOLDER + "/" + file.filename);
    }

    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        title: Joi.string().min(3).max(20).required(),
        code: Joi.string().min(3).max(20).required(),
        price: Joi.number().min(1).required(),
        salePrice: Joi.number().min(1).required(),
        discount: Joi.number(),
        size: Joi.string().required(),
        tag: Joi.string().required(),
        color: Joi.string().required(),
        category: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
        isSale: Joi.boolean(),
        isNew: Joi.boolean(),
        shortDetails: Joi.string(),
        description: Joi.string(),
        images: Joi.array().required()
    });





    const result = Schema.validate({ ...req.body, images: imagePath });
    if (result.error) {
        res.status(400);
        return next(new Error(result.error.details[0].message));
    }

    const name = result.value.name;
    const code = result.value.code;
    const product = new Product({ ...result.value, createdBy: loggedInUser.id });

    const isExists = await Product.isExists(name, code);
    if (!isExists) {
        const result = await product.save();
        return res.json(result);
    } else {
        res.status(400);
        return next(new Error(`Product Name ${name} already exists`));
    }
}


const updateProduct = async (req, res, next) => {
    if (!req.files || _.isEmpty(req.files)) {
        res.status(400);
        return next(new Error("No file uploaded"));
    }

    console.log(req.files.length);

    if (req.files.length < 5) {
        res.status(400);
        return next(new Error("Please upload 5 images per product"));
    }

    let imagePath = [];
    for (const file of req.files) {
        imagePath.push(UPLOAD_BRANDLOGO_FOLDER + "/" + file.filename);
    }

    const loggedInUser = req.session.user;

    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().min(3).max(20).required(),
        title: Joi.string().min(3).max(20).required(),
        code: Joi.string().min(3).max(20).required(),
        price: Joi.number().min(1).required(),
        salePrice: Joi.number().min(1).required(),
        discount: Joi.number(),
        size: Joi.string().required(),
        tag: Joi.string().required(),
        color: Joi.string().required(),
        category: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
        isSale: Joi.boolean(),
        isNew: Joi.boolean(),
        shortDetails: Joi.string(),
        description: Joi.string(),
        images: Joi.array().required()
    });
    const result = schema.validate({ ...req.body, images: imagePath });
    if (result.error) {
        res.status(400);
        const err = new Error(result.error.details[0].message);
        return next(err);
    }

    const name = result.value.name;
    const code = result.value.code;
    const productId = result.value.id;
    const isExists = await Product.isExists(name, code, productId);
    if (!isExists) {
        let product = await Product.findById(productId);
        product = Object.assign(product, result.value, { modifiedBy: loggedInUser.id });
        product = await product.save();
        res.json({ message: "updated Successfully !!" });
    } else {
        res.status(400);
        return next(new Error(`Product Name ${name} already exists`));
    }
}


const deleteProduct = async (req, res, next) => {
    const loggedInUser = req.session.user;
    const schema = Joi.object({
        id: Joi.string().required()
    });
    const result = schema.validate(req.body);

    if (result.error) {
        const err = new Error(result.error.details[0].message);
        return next(err);
    }

    const productId = result.value.id;
    //await Product.findOneAndUpdate(productId, { modifiedBy: loggedInUser.id }, { isActive: false });
    let product = await Product.findById(productId);
    product = Object.assign(product, { modifiedBy: loggedInUser.id, isActive: false });
    product = await product.save();
    res.json({ message: "deleted Successfully !!" });
}

const getProductByCategory = async (req, res, next) => {
    //const products = await Product.find({ category: req.params.categoryId, isActive: true });

    // const products = await Product.find({ category: req.params.categoryId, isActive: true })
    // .populate('size').populate('tag').populate('color').populate('category');

    const products = await Product.find({ category: req.params.categoryId, isActive: true })
    .populate('size tag color category');

    res.json({ products });
}


module.exports = { getAllProducts };

// module.exports = { getAllProducts, getProductById, saveProduct, updateProduct, deleteProduct, getProductByCategory };