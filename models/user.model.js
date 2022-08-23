const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First Name is required !!'],
        lowercase: true,
        match: [/^[a-zA-Z0-9]+$/, 'First Name is Invalid']
    },
    last_name: {
        type: String,
        required: [true, 'Last Name is required !!'],
        lowercase: true,
        match: [/^[a-zA-Z0-9]+$/, 'Last Name is Invalid']
    },
    email: {
        type: String,
        required: [true, 'Email is required !!'],
        lowercase: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email is Invalid']
    },
    phone: {
        type: String,
        unique: true,
        required: [true, 'Phone is required !!']
    },
    userTypeId: {
        type: Number,
        required: [true, 'UserType is required !!']
    },
    password: {
        type: String,
        required: [true, 'Password is required !!'],
    },
    confirmPassword: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: true
    }
}
    , {
        timestamps: true
    }
);

UserSchema.plugin(uniqueValidator, { message: 'Expected {PATH} to be unique that is {VALUE}' });

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmPassword = undefined;
    }
    next();
});

UserSchema.statics.isExists = async function isExists(Email) {
    console.log("isExists method called !!");
    const user = await this.findOne({ email: Email });
    return user ? true : false;
}

const User = mongoose.model('user', UserSchema);
module.exports = { User };
