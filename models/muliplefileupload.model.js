const mongoose = require('mongoose');

const MultipleFilesSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required !!']
    },
    imagePath: {
        type: String,
        required: [true, 'Image Path is required !!']
    },

    }
);



const MultipleFilesU = mongoose.model('MultipleFilesSchema', MultipleFilesSchema);
module.exports = { MultipleFilesU };
