const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    
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

    // emailId: {
    //     type: String,
    //     //unique: true,
    //     //required: [true, 'Name is required !!']
    // },

    password: {
        type: String,
        required: [true, 'Name is required !!']
    },

    confirmpassword: {
        type: String,
        required: [true, 'Name is required !!']
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

const Register = mongoose.model('Register', registerSchema);
module.exports = { Register };
