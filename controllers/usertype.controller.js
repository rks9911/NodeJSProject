const { UserType } = require('../models/usertype.model');
const Joi = require('joi');

const getAllUserTypes = async (req, res, next) => {
    const limit = Number.parseInt(req.query.pageusertype) || 5;
    const page = Number.parseInt(req.query.page) || 1;
    const sort_by = req.query.sort;
    const skip = limit * (page - 1);
    let count = 0;

    const usertypes = await UserType.find({isActive : true}).sort(sort_by).skip(skip).limit(limit);
    count = await UserType.countDocuments();
    if (usertypes) {
        res.json({ usertypes, count });
    } else {
        res.status(400);
        return next(new Error('No Record Found !!'));
    }
}

const getUserTypeById = async (req, res, next) => {
    const _id = req.params.id;
    console.log(_id);
    const usertype = await UserType.findOne({ _id, isActive: true }, {});
    if (usertype) {
        res.json({ usertype });
    } else {
        res.status(400);
        return next(new Error('No Record Found !!'));
    }
}


const saveUserType = async (req, res, next) => {
    const loggedInUser = req.session.user;
    const Schema = Joi.object({
        name: Joi.string().min(1).max(10).required()
    });
    const result = Schema.validate(req.body);
    if (result.error) {
        res.status(400);
        return next(new Error(result.error.details[0].message));
    }

    const name = result.value.name;
    const usertype = new UserType({ name, createdBy: loggedInUser.id });

    const isExists = await UserType.isExists(name);
    if (!isExists) {
        const result = await usertype.save();
        return res.json(result);
    } else {
        res.status(400);
        return next(new Error(`UserType Name ${name} already exists`));
    }
}


const updateUserType = async (req, res, next) => {
    const loggedInUser = req.session.user;
    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().min(1).max(10).required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        const err = new Error(result.error.details[0].message);
        return next(err);
    }

    const name = result.value.name;
    const usertypeId = result.value.id;
    const isExists = await UserType.isExists(name, usertypeId);
    if (!isExists) {
        let usertype = await UserType.findById(usertypeId);
        usertype = Object.assign(usertype, result.value, { modifiedBy: loggedInUser.id });
        usertype = await usertype.save();
        res.json({ message: "updated Successfully !!" });
    } else {
        res.status(400);
        return next(new Error(`UserType Name ${name} already exists`));
    }
}


const deleteUserType = async (req, res, next) => {
    const loggedInUser = req.session.user;
    const schema = Joi.object({
        id: Joi.string().required()
    });
    const result = schema.validate(req.body);

    if (result.error) {
        const err = new Error(result.error.details[0].message);
        return next(err);
    }

    const usertypeId = result.value.id;
    //await UserType.findOneAndUpdate(usertypeId, { modifiedBy: loggedInUser.id }, { isActive: false });
    let usertype = await UserType.findById(usertypeId);
    usertype = Object.assign(usertype, { modifiedBy: loggedInUser.id, isActive: false });
    usertype = await usertype.save();
    res.json({ message: "deleted Successfully !!" });
}

module.exports = { getAllUserTypes, getUserTypeById, saveUserType, updateUserType, deleteUserType };