const mongoose = require('mongoose');

const BrandLogoSchema = mongoose.Schema({
    // name: {
    //     type: String,
    //    // required: [true, 'Name is required !!']
    // },
    imagePath: {
        type: String,
        required: [true, 'Image Path is required !!']
    },
//     isActive: {
//         type: Boolean,
//         default: true
//     },
//     createdBy: {
//         type: mongoose.Types.ObjectId,
//         ref: "user",
//        // required: true
//     },
//     modifiedBy: {
//         type: mongoose.Types.ObjectId,
//         ref: "user"
//     }
// }
//     , {
//         // timestamps: true
//         timestamps: {
//             createdAt: "createdOn",
//             updatedAt: "modifiedOn"
//         }
    }
);

BrandLogoSchema.statics.isExists = async function isExists(name, id) {
    let brandlogo;
    if (id) {
        brandlogo = await this.findOne({ name: name, isActive: true, _id: { $ne: id } }, { name: 1 });
    } else {
        brandlogo = await this.findOne({ name: name, isActive: true }, { name: 1 });
    }
    return brandlogo ? true : false;
}

const BrandLogo = mongoose.model('brandlogo', BrandLogoSchema);
module.exports = { BrandLogo };
