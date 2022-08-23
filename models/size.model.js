const mongoose = require('mongoose');

const SizeSchema = mongoose.Schema({
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

SizeSchema.statics.isExists = async function isExists(name, id) {
    let size;
    if (id) {
        size = await this.findOne({ name: name, isActive: true, _id: { $ne: id } }, { name: 1 });
    } else {
        size = await this.findOne({ name: name, isActive: true }, { name: 1 });
    }
    return size ? true : false;
}

const Size = mongoose.model('size', SizeSchema);
module.exports = { Size };
