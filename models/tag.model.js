const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
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

TagSchema.statics.isExists = async function isExists(name, id) {
    let tag;
    if (id) {
        tag = await this.findOne({ name: name, isActive: true, _id: { $ne: id } }, { name: 1 });
    } else {
        tag = await this.findOne({ name: name, isActive: true }, { name: 1 });
    }
    return tag ? true : false;
}

const Tag = mongoose.model('tag', TagSchema);
module.exports = { Tag };
