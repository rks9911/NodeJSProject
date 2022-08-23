const express = require("express");
const orderRouter = express.Router();

const { getOrders, getOrderByUser, placeOrder, deleteOrder } = require('../controllers/order.controller');
const { userAuthMiddleware,adminAuthMiddleware } = require('../middlewares/user.auth.middleware');

orderRouter.get('/', adminAuthMiddleware, getOrders);
orderRouter.get('/:userId', adminAuthMiddleware, getOrderByUser);
orderRouter.post('/', userAuthMiddleware, placeOrder);
orderRouter.delete('/:orderId', adminAuthMiddleware, deleteOrder);

module.exports =  orderRouter ;