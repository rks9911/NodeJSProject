const { fileupload } = require('../models/fileupload.model');
const Joi = require('joi');
const _ = require('underscore');
const { UPLOAD_BRANDLOGO_FOLDER } = process.env;

const savedata = async (req, res, next) => {

    
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
    const fileupload = new fileupload({ ...result.value, createdBy: loggedInUser.id });

    const resultdata = await fileupload.save();
    res.json(resultdata);


}


module.exports = { savedata };