const { Register } = require('../models/register.model');
//var bcrypt = require('bcryptjs');
const Joi = require('joi');
//const jwt = require('jsonwebtoken');

// For Any Role
function validateUserRegistration(Register) {
    const schema = Joi.object({
        firstName: Joi.string().min(1).max(200).required(),
        lastname: Joi.string().min(1).max(200).required(),
        emailId: Joi.string().email().required(),
        password: Joi.string().min(1).max(200).required(),
        confirmpassword: Joi.string().min(1).max(200).required()
      
    });

    const result = schema.validate(Register);
    return result;
}

const addRegister = async (req, res, next) => {
    const result = validateUserRegistration(req.body);
    if (result.error) {
        res.status(400);
        return next(new Error(result.error.details[0].message));
    }

   

    const userData = result.value;

    if (userData.password != userData.confirmpassword) {
        res.status(400);
        return next(new Error("Password and Confirm Password must be match !!"));
    }

    console.log(userData);
   
    let user = await new Register(userData).save();
    res.json({ message: "sucessfully Inserted" })
    res.status(200);
    // if (userData.password != userData.confirmPassword) {
    //     res.status(400);
    //     return next(new Error("Password and Confirm Password must be match !!"));
    // }

    // let user = await new Register(userData).save();

    // let isExists = await User.isExists(userData.email);
    // if (!isExists) {
    //     try {
    //         let user = await new User(userData).save();
    //         res.status(201);
    //         res.json(user);
    //     } catch (error) {
    //         res.status(400);
    //         return next(new Error(error));
    //     }
    // } else {
    //     res.status(400);
    //     return next(new Error("Email Id already registered !!"));
    // }
}





module.exports = { addRegister };

