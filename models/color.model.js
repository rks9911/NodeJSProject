const mongoose = require('mongoose');

const ColorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required !!']
    },
    code: {
        type: String,
        required: [true, 'Code is required !!']
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

ColorSchema.statics.isExists = async function isExists(name, code, id) {
    let color;
    if (id) {
        color = await this.findOne({ $or: [{ name: name }, { code: code }], isActive: true, _id: { $ne: id } }, { name: 1});
    } else {
        color = await this.findOne({ $or: [{ name: name }, { code: code }], isActive: true }, { name: 1 });
    }
    return color ? true : false;
}

const Color = mongoose.model('color', ColorSchema);
module.exports = { Color };
