const express = require('express');
const router = express.Router();
const orderSchema = require('../models/order_schema');

router.get('/', async (req, res) => {
    try {
        const orders = await orderSchema.find();
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/:orderId', async (req, res) => {
    try {
        const orderID = req.params.orderId;
        const specificOrder = await orderSchema.findById(orderID);
        res.status(200).json(specificOrder);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    const orderProductName = req.body.order_productName;
    const orderType = req.body.order_type;
    const partyNameVal = req.body.partyName;
    const orderProductCategory = req.body.order_productCategory;
    let productUnitPrice = req.body.productUnitPrice;
    const orderQuantity = req.body.order_quantity;
    let orderTotalDiscountAllowed = req.body.order_discount;
    let orderPaymentStatus = req.body.order_paymentStatus;
    const orderDescription = req.body.order_description;

    if(orderPaymentStatus == "Paid" || orderPaymentStatus == "paid" || orderPaymentStatus.toUpperCase() == "paid".toUpperCase() || orderPaymentStatus) {
        orderPaymentStatus = true;
    }else{
        orderPaymentStatus = false;
    }
    if(orderTotalDiscountAllowed === undefined) {
        orderTotalDiscountAllowed = 0;
    }

    let totalPayment = ( productUnitPrice * orderQuantity);

    if( orderTotalDiscountAllowed != 0 && orderTotalDiscountAllowed !== undefined){
        let totalDiscountValue = (totalPayment) * (orderTotalDiscountAllowed / 100);
        totalPayment = totalPayment - totalDiscountValue;
    }

    const order = new orderSchema({
        order_productName: orderProductName,
        order_type : orderType,
        partyName : partyNameVal,
        order_productCategory : orderProductCategory,
        productUnitPrice : productUnitPrice,
        ordered_quantity : orderQuantity,
        order_discountAllowed : orderTotalDiscountAllowed,
        order_totalPayment : totalPayment,
        order_paymentStatus : orderPaymentStatus,
        order_description : orderDescription
    });

    await order.save()
    .then( data => {
        res.status(200).json(data);
    })
    .catch( err => {
        res.status(500).json(err);
    });

});

router.put('/:orderId', async(req, res) => {
    const orderId = req.params.orderId;
    const orderProductName = req.body.order_productName;
    const orderType = req.body.order_type;
    const partyNameVal = req.body.partyName;
    const orderProductCategory = req.body.order_productCategory;
    let productUnitPrice = req.body.productUnitPrice;
    const orderQuantity = req.body.order_quantity;
    let orderTotalDiscountAllowed = req.body.order_discount;
    let orderPaymentStatus = req.body.order_paymentStatus;
    const orderDescription = req.body.order_description;


    if(orderPaymentStatus == "Paid" || orderPaymentStatus == "paid" || orderPaymentStatus.toUpperCase() == "paid".toUpperCase() || orderPaymentStatus) {
        orderPaymentStatus = true;
    }else{
        orderPaymentStatus = false;
    }
    if(orderTotalDiscountAllowed === undefined) {
        orderTotalDiscountAllowed = 0;
    }

    let totalPayment = ( productUnitPrice * orderQuantity);

    if( orderTotalDiscountAllowed != 0 && orderTotalDiscountAllowed !== undefined){
        let totalDiscountValue = (totalPayment) * (orderTotalDiscountAllowed / 100);
        totalPayment = totalPayment - totalDiscountValue;
    }

    await orderSchema.findByIdAndUpdate( orderId, { $set: {
                order_productName: orderProductName,
                order_type : orderType,
                partyName : partyNameVal,
                order_productCategory : orderProductCategory,
                productUnitPrice : productUnitPrice,
                ordered_quantity : orderQuantity,
                order_discountAllowed : orderTotalDiscountAllowed,
                order_totalPayment : totalPayment,
                order_paymentStatus : orderPaymentStatus,
                order_description : orderDescription
            }})
    .then( docs => {
        res.status(200).json(docs);
    })
    .catch( err => {
        res.status(500).json(err);
    });
});

router.delete('/:orderId', async(req, res) => {
    let orderID = req.params.orderId;
    try {
        const deletedOrder = await orderSchema.findByIdAndDelete(orderID);
        res.status(200).json(deletedOrder);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
