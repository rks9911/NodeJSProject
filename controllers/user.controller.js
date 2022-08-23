const { User } = require('../models/user.model');
var bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

// For Any Role
function validateUserRegistration(user) {
    const schema = Joi.object({
        first_name: Joi.string().min(4).max(20).required(),
        last_name: Joi.string().min(4).max(20).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(10).max(15).required(),
        userTypeId: Joi.number().min(1).max(2).required(),
        password: Joi.string().min(6).max(30).required(),
        confirmPassword: Joi.string().min(6).max(30).required()
    });

    const result = schema.validate(user);
    return result;
}

const addUser = async (req, res, next) => {
    const result = validateUserRegistration(req.body);
    if (result.error) {
        res.status(400);
        return next(new Error(result.error.details[0].message));
    }

    const userData = result.value;
    if (userData.password != userData.confirmPassword) {
        res.status(400);
        return next(new Error("Password and Confirm Password must be match !!"));
    }

    let isExists = await User.isExists(userData.email);
    if (!isExists) {
        try {
            let user = await new User(userData).save();
            res.status(201);
            res.json(user);
        } catch (error) {
            res.status(400);
            return next(new Error(error));
        }
    } else {
        res.status(400);
        return next(new Error("Email Id already registered !!"));
    }
}

function validateLoginCredentials(user) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required()
    });

    const result = schema.validate(user);
    return result;
}

const loginUser = async (req, res, next) => {
    const result = validateLoginCredentials(req.body);
    if (result.error) {
        res.status(400);
        const err = new Error(result.error.details[0].message);
        return next(err);
    }


    const { email, password } = result.value;
    const user = await User.findOne({ email });
    if (user) {
        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            const payload = {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                userTypeId: user.userTypeId
            };

            const token = jwt.sign(payload, process.env.JWT_KEY);
            return res.json({ message: 'Login Success !!', token });
        }
        else {
            return res.status(400).send({
                message: 'Invalid Credential'
            });
        }
    }

    res.status(400);
    return next(new Error('User does not exists with this email !!'));
}

const updateProfile = async (req, res, next) => {
    const loggedInUser = req.session.user;
    console.log("LoggedIn User :", loggedInUser);

    const schema = Joi.object({
        first_name: Joi.string().min(4).max(20),
        last_name: Joi.string().min(4).max(20),
        phone: Joi.string().min(10).max(14)
    });

    const result = schema.validate(req.body);
    if (result.error) {
        const err = new Error(result.error.details[0].message);
        return next(err);
    } else {
        try {
            await User.findOneAndUpdate(userId, req.body);
            res.json({ message: "updated Successfully !!" });
        } catch (error) {
            res.status(400);
            return next(new Error(error));
        }
        // try {
        //     let user = await User.findById(loggedInUser.id);
        //     user = Object.assign(user, result.value);
        //     console.log(user);
        //     user = await user.save();
        //     res.json(user);
        // } catch (error) {
        //     res.status(400);
        //     return next(new Error(error));
        // }
    }

}

const getAllUser = async (req, res, next) => {
    try {
        const limit = Number.parseInt(req.query.pagesize) || 5;
        const page = Number.parseInt(req.query.page) || 1;
        const sort_by = req.query.sort;
        const skip = limit * (page - 1);
        let count = 0;
        try {
            const users = await User.find({isActive : true}).sort(sort_by).skip(skip).limit(limit);
            try {
                count = await User.countDocuments();
                res.json({ users, count });
            } catch (error) {
                res.status(400);
                return next(new Error(error));
            }
        } catch (error) {
            res.status(400);
            return next(new Error(error));
        }
    } catch (error) {
        res.status(400);
        return next(new Error(error));
    }
}

const updateUserById = async (req, res, next) => {
    const userId = req.params.id;
    try {
        try {
            await User.findOneAndUpdate(userId, req.body);
            res.json({ message: "updated Successfully !!" });
        } catch (error) {
            res.status(400);
            return next(new Error(error));
        }
        // let user = await User.findById(userId);
        // user = Object.assign(user, req.body);
        // try {
        //     user = await user.save();
        //     res.json(user);
        // } catch (error) {
        //     res.status(400);
        //     return next(new Error(error));
        // }
    } catch (error) {
        res.status(400);
        return next(new Error(error));
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const schema = Joi.object({
            is_active: Joi.boolean().required()
        });

        const result = schema.validate(req.body);
        if (result.error) {
            const err = new Error(result.error.details[0].message);
            return next(err);
        } else {
            try {
                // let user = await User.findById(userId);
                // user = Object.assign(user, req.body);
                // try {
                //     user = await user.save();
                //     res.json(user);
                // } catch (error) {
                //     res.status(400);
                //     return next(new Error(error));
                // }

                try {
                    await User.findOneAndUpdate(userId, result.value);
                    res.json({ message: "updated Successfully !!" });
                } catch (error) {
                    res.status(400);
                    return next(new Error(error));
                }
            } catch (error) {
                res.status(400);
                return next(new Error(error));
            }
        }
    } catch (error) {
        res.status(400);
        return next(new Error(error));
    }
}

module.exports = { addUser, loginUser, updateProfile, getAllUser, updateUserById, deleteUser };