const mongoose = require('mongoose');

const multipleproducts = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required !!']
    },
   
   
    imagePath: {
        type : []
    }
   

    }
);

const Products = mongoose.model('multipleproducts', multipleproducts);
module.exports = { Products };