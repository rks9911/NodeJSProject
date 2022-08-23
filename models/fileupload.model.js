const mongoose = require('mongoose');

const fileuploadLogoSchema = mongoose.Schema({
    name: {
        type: String,
       // required: [true, 'Name is required !!']
    },
    imagePath: {
        type: String,
        required: [true, 'Image Path is required !!']
    },

    }
);

// fileuploadLogoSchema.statics.isExists = async function isExists(name, id) {
//     console.log(name);
//     console.log(id);
//     let fileupload;
//     if (id) {
//         fileupload = await this.findOne({ name: name, isActive: true, _id: { $ne: id } }, { name: 1 });
//     } else {
//         fileupload = await this.findOne({ name: name, isActive: true }, { name: 1 });
//     }
//     return fileupload ? true : false;
// }

const fileupload = mongoose.model('fileupload', fileuploadLogoSchema);
module.exports = { fileupload };
