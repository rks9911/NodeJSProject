const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required !!']
    },
    title: {
        type: String,
        required: [true, 'Title is required !!']
    },
    code: {
        type: String,
        required: [true, 'Code is required !!']
    },
    price: {
        type: Number,
        required: [true, 'Price is required !!']
    },
    salePrice: {
        type: Number,
        required: [true, 'Sale Price is required !!']
    },
    discount: {
        type: Number,
        required: [true, 'Discount is required !!']
    },
    size: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Size is required !!'],
        ref : 'size'
    },
    tag: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Tag is required !!'],
        ref : 'tag'
    },
    color: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Color is required !!'],
        ref : 'color'
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Category is required !!'],
        ref : 'category'
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required !!']
    },
    isSale : {
        type : Boolean
    },
    isNew : {
        type : Boolean
    },
    shortDetails : {
        type : String
    },
    description : {
        type : String
    },
    images: {
        type : []
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: [true,'CreatedBy is required']
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

// ProductSchema.statics.isExists = async function isExists(name, code, id) {
//     let product;
//     if (id) {
//         product = await this.findOne({ $or: [{ name: name }, { code: code }], isActive: true, _id: { $ne: id } }, { name: 1 });
//     } else {
//         product = await this.findOne({ $or: [{ name: name }, { code: code }], isActive: true }, { name: 1 });
//     }
//     return product ? true : false;
// }

const Product = mongoose.model('products', ProductSchema);
module.exports = { Product };
