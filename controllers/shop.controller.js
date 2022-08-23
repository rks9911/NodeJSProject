const { Shop } = require('../models/shop.model');
const MainUrl = "http://localhost:5200/";
const shopfileuploads = (req, res) => {

    console.log("enter in shop controller");
    console.log(req.files.length);
    //if (req.files.length) {
    console.log(req.files);

    const filesData = [];
    for (let i = 0; i < req.files.length; i++) {
        const filesssData = req.files[i].path;
        filesData.push({
            path: MainUrl + filesssData
        });

        console.log(filesData);
    }


    var saveFiles = new Shop();
    saveFiles.name = req.body.name;
    saveFiles.title = req.body.title;
    saveFiles.code = req.body.code;
    saveFiles.price = req.body.price;
    saveFiles.salePrice = req.body.salePrice;
    saveFiles.discount = req.body.discount;
    saveFiles.size = req.body.size;
    saveFiles.tag = req.body.tag;
    saveFiles.color = req.body.color;
    saveFiles.category = req.body.category;
    saveFiles.quantity = req.body.quantity;
    saveFiles.isSale = req.body.isSale;
    saveFiles.isNew = req.body.isNew;
    saveFiles.shortDetails = req.body.shortDetails;
    saveFiles.description = req.body.description;
    saveFiles.imagePath = JSON.stringify(filesData);

    saveFiles.save((err, doc) => {
        if (!err)
            res.status(200).send({
                statusCode: 200,
                message: "files uploaded succesfully"

            });
    });

}


const getAllMultiFiles = async (req, res) => {
    const cursor = await Shop.find({});
   
    let fileInfos = [];

    //   //const new = await Shop.find();
    await cursor.forEach((doc) => {

        let fileInfosss = [];
        //console.log(typeof(doc.imagePath));
        const imsge = JSON.parse(doc.imagePath);
        // console.log(typeof(imsge));
        // console.log(imsge);
        imsge.forEach((dhdd) => {
            fileInfosss.push({
                path: dhdd.path
            });
        });
        fileInfos.push({
            name: doc.name,
            title: doc.title,
            code: doc.code,
            price: doc.price,
            salePrice: doc.salePrice,
            discount: doc.discount,
            tag: doc.tag,
            color: doc.color,
            category: doc.category,
            quantity: doc.quantity,
            isSale: doc.isSale,
            isNew: doc.isNew,
            shortDetails: doc.shortDetails,
            description: doc.description,
            isActive: doc.isActive,
            files: fileInfosss,

        });
    });


    return res.status(200).send({
        statusCode: 200,
        message: "files uploaded list",
        data : fileInfos
    });
   
}

const getByIDMultiFiles = (req, res) => {
    Shop.findById(req.params.id, (err, listoffiles) => {
        res.status(200).send({
            statusCode: 200,
            message: "files by id uploaded list",
            data: listoffiles

        });

    });
}

const getRemoveByIDMultiFiles = (req, res) => {

    Shop.findByIdAndRemove(req.params.id, (err, listoffiles) => {
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
    Shop.findOneAndUpdate({ _id: req.body._id },
        {
            name: req.body.name,
            // title:req.body.title,
            // code:req.body.code,
            // price:req.body.price,
            // salePrice:req.body.salePrice,
            // discount:req.body.discount,
            // size:req.body.size,
            // tag:req.body.tag,
            // color:req.body.color,
            // category:req.body.category,
            // quantity:req.body.quantity,
            // isSale:req.body.isSale,
            // isNew:req.body.isNew,
            // shortDetails:req.body.shortDetails,
            // description:req.body.description,

            imagePath: JSON.stringify(filesData)
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
    shopfileuploads,
    getAllMultiFiles,
    getByIDMultiFiles,
    getRemoveByIDMultiFiles,
    updateFilesUploads

}