const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required !!']
    },
    quantity: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        default: 'COD'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}
    , {
        timestamps: {
            createdAt: "createdOn",
            updatedAt: "modifiedOn"
        }
    }
);

const Order = mongoose.model('order', OrderSchema);
module.exports = { Order };
