const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    
    firstName: {
        type: String,
        required: [true, 'First Name is required !!'],
      
    },

    lastname: {
        type: String,
        required: [true, 'First Name is required !!'],
      
    },

     emailId: {
        type: String,
        required: [true, 'Email is required !!'],
        lowercase: true,
       
    },

  
    mobileNo: {
        type: String,
        required: [true, 'Mobile Number is required !!']
    },

    message: {
        type: String
       
    },

    isActive: {
        type: Boolean,
        default: true
    },
    // createdBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "user",
    //     required: true
    // },
    // modifiedBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "user"
    // }
}
    // , {
    //     // timestamps: true
    //     timestamps: {
    //         createdAt: "createdOn",
    //         updatedAt: "modifiedOn"
    //     }
    // }
);

// registerSchema.statics.isExists = async function isExists(Email) {
//     console.log("isExists method called !!");
//     const user = await this.findOne({ emailId: Email });
//     return user ? true : false;
// }

// registerSchema.statics.isExists = async function isExists(name, id) {
//     let Register;
//     if (id) {
//         Register = await this.findOne({ name: name, isActive: true, _id: { $ne: id } }, { name: 1 });
//     } else {
//         Register = await this.findOne({ name: name, isActive: true }, { name: 1 });
//     }
//     return Register ? true : false;
// }

const Contactus = mongoose.model('Contactus', contactSchema);
module.exports = { Contactus };
