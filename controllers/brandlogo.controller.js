const { BrandLogo } = require('../models/brandlogo.model');
const Joi = require('joi');
const _ = require('underscore');
const { UPLOAD_BRANDLOGO_FOLDER } = process.env;

const getAllBrandLogos = async (req, res, next) => {
    const limit = Number.parseInt(req.query.pagebrandlogo) || 5;
    const page = Number.parseInt(req.query.page) || 1;
    const sort_by = req.query.sort;
    const skip = limit * (page - 1);
    let count = 0;

    const brandlogos = await BrandLogo.find({ isActive: true }).sort(sort_by).skip(skip).limit(limit);
    count = await BrandLogo.countDocuments();
    if (brandlogos) {
        res.json({ brandlogos, count });
    } else {
        res.status(400);
        return next(new Error('No Record Found !!'));
    }
}

const getBrandLogoById = async (req, res, next) => {
    const _id = req.params.id;
    console.log(_id);
    const brandlogo = await BrandLogo.findOne({ _id, isActive: true }, {});
    if (brandlogo) {
        res.json({ brandlogo });
    } else {
        res.status(400);
        return next(new Error('No Record Found !!'));
    }
}


const saveBrandLogo = async (req, res, next) => {
    if (!req.file || _.isEmpty(req.file)) {
        res.status(400);
        return next(new Error("No file uploaded"));
    }

    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        name: Joi.string().min(1).max(10).required(),
        imagePath: Joi.string().required(),
    });

    const imagePath = UPLOAD_BRANDLOGO_FOLDER + "/" + req.file.filename;

    const result = Schema.validate({ ...req.body, imagePath });
    if (result.error) {
        res.status(400);
        return next(new Error(result.error.details[0].message));
    }

    const name = result.value.name;
    const brandlogo = new BrandLogo({ ...result.value, createdBy: loggedInUser.id });

    const isExists = await BrandLogo.isExists(name);
    if (!isExists) {
        const result = await brandlogo.save();
        return res.json(result);
    } else {
        res.status(400);
        return next(new Error(`BrandLogo Name ${name} already exists`));
    }
}


const updateBrandLogo = async (req, res, next) => {
    const loggedInUser = req.session.user;
    const imagePath = UPLOAD_BRANDLOGO_FOLDER + "/" + req.file.filename;

    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().min(1).max(10).required(),
        imagePath: Joi.string().required()
    });
    const result = schema.validate({ ...req.body, imagePath });
    if (result.error) {
        res.status(400);
        const err = new Error(result.error.details[0].message);
        return next(err);
    }

    const name = result.value.name;
    const brandlogoId = result.value.id;
    const isExists = await BrandLogo.isExists(name, brandlogoId);
    if (!isExists) {
        let brandlogo = await BrandLogo.findById(brandlogoId);
        brandlogo = Object.assign(brandlogo, result.value, { modifiedBy: loggedInUser.id });
        brandlogo = await brandlogo.save();
        res.json({ message: "updated Successfully !!" });
    } else {
        res.status(400);
        return next(new Error(`BrandLogo Name ${name} already exists`));
    }
}


const deleteBrandLogo = async (req, res, next) => {
    const loggedInUser = req.session.user;
    const schema = Joi.object({
        id: Joi.string().required()
    });
    const result = schema.validate(req.body);

    if (result.error) {
        const err = new Error(result.error.details[0].message);
        return next(err);
    }

    const brandlogoId = result.value.id;
    //await BrandLogo.findOneAndUpdate(brandlogoId, { modifiedBy: loggedInUser.id }, { isActive: false });
    let brandlogo = await BrandLogo.findById(brandlogoId);
    brandlogo = Object.assign(brandlogo, { modifiedBy: loggedInUser.id, isActive: false });
    brandlogo = await brandlogo.save();
    res.json({ message: "deleted Successfully !!" });
}

module.exports = { getAllBrandLogos, getBrandLogoById, saveBrandLogo, updateBrandLogo, deleteBrandLogo };