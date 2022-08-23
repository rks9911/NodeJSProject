const express = require('express')
const app = express();
const path = require("path");
require('express-async-errors');
require('./logger/logger');

const morgan = require('morgan');
require('./database/db.connection')();
const cors = require('cors');

const helmet = require("helmet");
app.use(helmet());

// var corsOptions = {
//     origin: 'http://sahosoft.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

// app.use(cors(corsOptions));

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

app.use(cors());


app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({ message: "Success sucessfully !!" })
});

const handleErrors = require('./middlewares/error.handle.middleware');



const APIRouter = express.Router();
APIRouter.get('', (req, res) => {
    res.json({ message: "api is working !!" })
});
 app.use("/api", APIRouter);
 const routers = require('./router/routers');

 APIRouter.use('/users', routers.userRouter);
APIRouter.use('/sizes', routers.sizeRouter);
 APIRouter.use('/tags', routers.tagRouter);
APIRouter.use('/usertypes', routers.usertypeRouter);
 APIRouter.use('/colors', routers.colorRouter);

 APIRouter.use('/brandlogo', routers.brandlogoRouter);

 APIRouter.use('/register', routers.registerRouter);

 APIRouter.use('/contactus', routers.contactusRouter);

 //APIRouter.use('/fileupload', routers.uploadRouter);

// APIRouter.use('/register', routers.registerRouter);

 APIRouter.use('/category', routers.categoryRouter);
// APIRouter.use('/products', routers.productRouter);
// APIRouter.use('/orders', routers.orderRouter);
 APIRouter.use('/multiplefiles', routers.multiplefilesuploadRouter);

 APIRouter.use('/shop', routers.shopRouter);

 //APIRouter.use('/productsall', routers.productsRouter);



const { UPLOAD_BRANDLOGO_FOLDER, UPLOAD_CATEGORY_FOLDER, UPLOAD_PRODUCT_FOLDER } = process.env;

APIRouter.get("/" + UPLOAD_BRANDLOGO_FOLDER + "/*", (req, res, next) => {
    const path = req.url;
    const filepath = `${__dirname}${path}`;
    res.sendFile(filepath, (err) => {
        next();
    });
});

APIRouter.get("/" + UPLOAD_CATEGORY_FOLDER + "/*", (req, res, next) => {
    const path = req.url;
    const filepath = `${__dirname}${path}`;
    res.sendFile(filepath, (err) => {
        next();
    });
});

APIRouter.get("/" + UPLOAD_PRODUCT_FOLDER + "/*", (req, res, next) => {
    const path = req.url;
    const filepath = `${__dirname}${path}`;
    res.sendFile(filepath, (err) => {
        next();
    });
});

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { Promise } = require('mongoose');

const options = {
    definition: {
        info: {
            title: 'e-Commerce Rest API',
            version: '1.0.0',
            description: 'A Rest API built with Express and mongo'
        },
    },
    apis: ['./router/size-router.js', './router/tag-router.js'], // files containing annotations as above


};

const swaggerDocs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(handleErrors);
module.exports = { app };