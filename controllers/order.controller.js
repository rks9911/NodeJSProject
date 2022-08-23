const Joi = require('joi');
const { Order } = require('../models/order.model');
const { Product } = require('../models/product.model');

async function getOrders(req, res, next) {
    // //const orders = await Order.find().populate('user product');

    // // const orders = await Order.find().populate([
    // //     {
    // //         path: 'product',
    // //         populate: 'category',
    // //     },
    // //     {
    // //         path: 'user',
    // //         select: { '_id': 0, 'first_name': 1, 'last_name': 1,'email' : 1 }
    // //     }
    // // ]);

    // const orders = await Order.find().populate([
    //     {
    //         path: 'product',
    //         populate: 'category tag color size',
    //     },
    //     {
    //         path: 'user',
    //         select: { '_id': 0, 'first_name': 1, 'last_name': 1,'email' : 1 }
    //     }
    // ]);

    // res.json({ orders });


    const limit = Number.parseInt(req.query.pagesize) || 5;
    const page = Number.parseInt(req.query.page) || 1;
    const sort_by = req.query.sort;
    const skip = limit * (page - 1);
    let count = 0;


    const orders = await Order.find().sort(sort_by).skip(skip).limit(limit).populate([
        {
            path: 'product',
            populate: 'category tag color size',
        },
        {
            path: 'user',
            select: { '_id': 0, 'first_name': 1, 'last_name': 1, 'email': 1 }
        }
    ]);

    count = await Order.countDocuments();
    if (orders) {
        res.json({ orders, count });
    } else {
        res.status(400);
        return next(new Error('No Record Found !!'));
    }

}

async function getOrderByUser(req, res) {
    const user = req.params.userId;
    const orders = await Order.find({ user }).populate('product');
    res.json({ orders });
}

async function deleteOrder(req, res) {
    const _id = req.params.orderId;
    await Order.deleteOne({ _id });
    res.json({ message: 'Order deleted !!' });
}

async function placeOrder(req, res, next) {
    const schema = Joi.object({
        orders: Joi.array().items({
            product: Joi.string().required(),
            user: Joi.string().required(),
            address: Joi.string().required(),
            quantity: Joi.number().min(1).required()
        }).min(1).required()
    });

    const result = schema.validate(req.body);
    if (result.error) {
        return next(new Error(result.error.details[0].message));
    }

    const { orders } = result.value;

    for (index in orders) {
        let order = orders[index];
        let productId = order.product;
        let productPrice = (await Product.findOne({ _id: productId })).price;
        orders[index].price = productPrice;
    }

    const saveResult = await Order.create(orders);
    res.json({ orders: saveResult });
}

module.exports = {
    getOrders,
    getOrderByUser,
    deleteOrder,
    placeOrder
};