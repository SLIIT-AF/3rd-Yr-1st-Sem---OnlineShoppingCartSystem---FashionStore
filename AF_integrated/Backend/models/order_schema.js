const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    order_productName : {
        type : String,
        required : true
    },
    order_type : {
        type :String,
        required: true
    },
    partyName : {
        type : String,
        required : true
    },
    order_productCategory : {
        type : String,
        required : true
    },
    productUnitPrice : {
        type : String,
        required : true
    },
    ordered_quantity : {
        type : Number,
        required : true
    },
    order_discountAllowed : {
        type : Number,
        required : true
    },
    order_totalPayment : {
        type : String
    },
    order_paymentStatus : {
        type : Boolean,
        required : true
    },
    order_placementDate : {
        type : Date
    },
    order_description : {
        type : String,
        default: ""
    }
});

module.exports = mongoose.model('orders', orderSchema);