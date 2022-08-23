const { Products } = require('../models/products.model');

const produstUploads = (req, res) => {
    console.log(req.files.length);
    //if (req.files.length) {
    console.log(req.files);
    const filesData = [];
    for (let i = 0; i < req.files.length; i++) {
        const filesssData = req.files[i].path;
        filesData.push(filesssData)
    }


    var saveFiles = new Products();
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

module.exports = {
    produstUploads

}