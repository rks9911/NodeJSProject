const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required !!']
    },
    title: {
        type: String,
        required: [true, 'Title is required !!']
    },
    isSave: {
        type: Number,
        required: [true, 'Save Value is required !!']
    },
    link: {
        type: String,
        required: [true, 'Link is required !!']
    },
    imagePath: {
        type: String,
        required: [true, 'Image Path is required !!']
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

CategorySchema.statics.isExists = async function isExists(name, id) {
    console.log(name);
    console.log(id);
    let category;
    if (id) {
        category = await this.findOne({ name: name, isActive: true, _id: { $ne: id } }, { name: 1 });
    } else {
        category = await this.findOne({ name: name, isActive: true }, { name: 1 });
    }
    return category ? true : false;
}

const Category = mongoose.model('category', CategorySchema);
module.exports = { Category };
