const { userRouter } = require('./user-router');
const { sizeRouter } = require('./size-router');
const { tagRouter } = require('./tag-router');
const { usertypeRouter } = require('./usertype-router');
const { colorRouter } = require('./color-router');
const brandlogoRouter = require('./brandlogo-router');
const registerRouter = require('./register-router');
const contactusRouter = require('./contactus-router');
// const uploadRouter = require('./fileupload-router');
const categoryRouter = require('./category-router');
const productRouter = require('./product-router');
// const orderRouter = require('./order-router');
const multiplefilesuploadRouter = require('./multiplefilesupload-router');
//const productsRouter = require('./products-router');

const shopRouter = require('./shop-router');

module.exports = {
    registerRouter,

    userRouter,
    sizeRouter,
    tagRouter,
    usertypeRouter,
    colorRouter,
    brandlogoRouter,
    contactusRouter,
    categoryRouter,
    productRouter,
    // uploadRouter

    // categoryRouter,

    // orderRouter
    multiplefilesuploadRouter,
    //productsRouter
    shopRouter

};