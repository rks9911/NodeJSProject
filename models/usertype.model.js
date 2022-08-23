const mongoose = require('mongoose');

const UserTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required !!']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    modifiedBy: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
}
    , {
        // timestamps: true
        timestamps: {
            createdAt: "createdOn",
            updatedAt: "modifiedOn"
        }
    }
);

UserTypeSchema.statics.isExists = async function isExists(name, id) {
    let usertype;
    if (id) {
        usertype = await this.findOne({ name: name, isActive: true, _id: { $ne: id } }, { name: 1 });
    } else {
        usertype = await this.findOne({ name: name, isActive: true }, { name: 1 });
    }
    return usertype ? true : false;
}

const UserType = mongoose.model('usertype', UserTypeSchema);
module.exports = { UserType };
