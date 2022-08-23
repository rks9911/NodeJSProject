

const { MultipleFilesU } = require('../models/muliplefileupload.model');

const multipleFilesUploads = (req, res) => {
    console.log(req.files.length);
    //if (req.files.length) {
    console.log(req.files);
    const filesData = [];
    for (let i = 0; i < req.files.length; i++) {
        const filesssData = req.files[i].path;
        filesData.push(filesssData)
    }


    var saveFiles = new MultipleFilesU();
    saveFiles.name = req.body.name;
    //    saveFiles.last_name = req.body.lastName;
    saveFiles.imagePath = JSON.stringify(filesData);
    saveFiles.save((err, doc) => {
        if (!err)
            res.status(200).send({
                statusCode: 200,
                message: "files uploaded succesfully"

            });
    });
}


const getAllMultiFiles = (req, res) => {
    MultipleFilesU.find((err, listoffiles) => {
        res.status(200).send({
            statusCode: 200,
            message: "files uploaded list",
            data: listoffiles

        });

    });
}

const getByIDMultiFiles = (req, res) => {
    MultipleFilesU.findById(req.params.id, (err, listoffiles) => {
        res.status(200).send({
            statusCode: 200,
            message: "files by id uploaded list",
            data: listoffiles

        });

    });
}
const getRemoveByIDMultiFiles = (req, res) => {
   
    MultipleFilesU.findByIdAndRemove(req.params.id, (err, listoffiles) => {
        res.status(200).send({
            statusCode: 200,
            message: "File remove successfully",
            data: listoffiles

        });

    });
}

const updateFilesUploads = (req, res) => {
    console.log(req.body);
    
    if (req.files) {
        var filesData = [];
        for (let i = 0; i < req.files.length; i++) {
            var filesssData = req.files[i].path;
            filesData.push(filesssData)
        }

    }
    console.log(req.filesData);
    MultipleFilesU.findOneAndUpdate({ _id: req.body._id },
        {
            name:req.body.name,
            imagePath:JSON.stringify(filesData)
        },
        (err, listoffiles) => {
            res.status(200).send({
                statusCode: 200,
                message: "File updated successfully..",
                data: listoffiles

            });

        });
}

module.exports = {
    multipleFilesUploads,
    getAllMultiFiles,
    getByIDMultiFiles,
    getRemoveByIDMultiFiles,
    updateFilesUploads
}