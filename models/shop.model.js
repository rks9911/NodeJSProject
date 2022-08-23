const mongoose = require('mongoose');

const shopschema = mongoose.Schema({
    name: {
        type: String
        //required: [true, 'Name is required !!']
    },
   
    
    imagePath: {
        type : String
    },

    title: {
        type: String
        //required: [true, 'Title is required !!']
    },
    code: {
        type: String
        //required: [true, 'Code is required !!']
    },

    price: {
        type: Number
        //required: [true, 'Price is required !!']
    },
    salePrice: {
        type: Number
       // required: [true, 'Sale Price is required !!']
    },
    discount: {
        type: Number
       // required: [true, 'Discount is required !!']
    },

    size: {
        type: String
    },

    tag: {
        type: String
    },

    color: {
        type: String
    },

    category: {
        type: String
    },

    quantity: {
        type: Number
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
   
    isActive: {
        type: Boolean,
        default: true
    },

    createdBy:
    {
        type:mongoose.Types.ObjectId,
        ref: "user",
      
    }
    // createdBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "user",
    //     required: [true,'CreatedBy is required']
    // },
    // modifiedBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "user"
    // }
   

    }
);

const Shop = mongoose.model('Shop', shopschema);
module.exports = { Shop };