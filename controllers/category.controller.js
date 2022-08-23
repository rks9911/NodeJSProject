const { Category } = require('../models/category.model');
const Joi = require('joi');
const _ = require('underscore');
const { UPLOAD_CATEGORY_FOLDER } = process.env;

const getAllCategorys = async (req, res, next) => {
    const limit = Number.parseInt(req.query.pagecategory) || 5;
    const page = Number.parseInt(req.query.page) || 1;
    const sort_by = req.query.sort;
    const skip = limit * (page - 1);
    let count = 0;

    const categorys = await Category.find({ isActive: true }).sort(sort_by).skip(skip).limit(limit);
    count = await Category.countDocuments();
    if (categorys) {
        res.json({ categorys, count });
    } else {
        res.status(400);
        return next(new Error('No Record Found !!'));
    }
}

const getCategoryById = async (req, res, next) => {
    const _id = req.params.id;
    console.log(_id);
    const category = await Category.findOne({ _id, isActive: true }, {});
    if (category) {
        res.json({ category });
    } else {
        res.status(400);
        return next(new Error('No Record Found !!'));
    }
}


const saveCategory = async (req, res, next) => {
    if (!req.file || _.isEmpty(req.file)) {
        res.status(400);
        return next(new Error("No file uploaded"));
    }

    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        name: Joi.string().min(1).max(10).required(),
        title: Joi.string().min(1).max(10).required(),
        isSave: Joi.number().min(1).max(99).required(),
        link: Joi.string().min(20).max(200).required(),
        imagePath: Joi.string().min(20).max(200).required()
    });

    const imagePath = UPLOAD_CATEGORY_FOLDER + "/" + req.file.filename;

    const result = Schema.validate({ ...req.body, imagePath });
    if (result.error) {
        res.status(400);
        return next(new Error(result.error.details[0].message));
    }

    const name = result.value.name;
    const category = new Category({ ...result.value, createdBy: loggedInUser.id });

    const isExists = await Category.isExists(name);
    if (!isExists) {
        const result = await category.save();
        return res.json(result);
    } else {
        res.status(400);
        return next(new Error(`Category Name ${name} already exists`));
    }
}


const updateCategory = async (req, res, next) => {
    const loggedInUser = req.session.user;
    const imagePath = UPLOAD_CATEGORY_FOLDER + "/" + req.file.filename;

    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().min(1).max(10).required() ,       
        title: Joi.string().min(1).max(10).required(),
        isSave: Joi.number().min(1).max(99).required(),
        link: Joi.string().min(20).max(200).required(),
        imagePath: Joi.string().min(20).max(200).required()
    });
    const result = schema.validate({ ...req.body, imagePath });
    if (result.error) {
        res.status(400);
        const err = new Error(result.error.details[0].message);
        return next(err);
    }

    const name = result.value.name;
    const categoryId = result.value.id;
    const isExists = await Category.isExists(name, categoryId);
    if (!isExists) {
        let category = await Category.findById(categoryId);
        category = Object.assign(category, result.value, { modifiedBy: loggedInUser.id });
        category = await category.save();
        res.json({ message: "updated Successfully !!" });
    } else {
        res.status(400);
        return next(new Error(`Category Name ${name} already exists`));
    }
}


const deleteCategory = async (req, res, next) => {
    const loggedInUser = req.session.user;
    const schema = Joi.object({
        id: Joi.string().required()
    });
    const result = schema.validate(req.body);

    if (result.error) {
        const err = new Error(result.error.details[0].message);
        return next(err);
    }

    const categoryId = result.value.id;
    //await Category.findOneAndUpdate(categoryId, { modifiedBy: loggedInUser.id }, { isActive: false });
    let category = await Category.findById(categoryId);
    category = Object.assign(category, { modifiedBy: loggedInUser.id, isActive: false });
    category = await category.save();
    res.json({ message: "deleted Successfully !!" });
}

module.exports = { getAllCategorys, getCategoryById, saveCategory, updateCategory, deleteCategory };