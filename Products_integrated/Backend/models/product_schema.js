const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName : {
        type: String,
        required : true
    },
    productBrand : {
        type : String,
        required : true
    },
    productDescription : {
        type : String
    },
    product_category :{
        type: String,
        required : true
    },
    product_unitprice : {
        type: mongoose.Decimal128,
        required: true
    },
    product_discount : {
        type : mongoose.Decimal128
    },
    supplier_name : {
        type : String,
        required : true
    },
    product_expirationDate : {
        type: String
    },
    product_expirationStatus : {
        type : String
    },
    product_averageRating : {
        type : Number,
        required : true,
    },
    createdDate : {
        type : Date,
        default : Date.now
    },
    imgSrc: {
        type : String,
        default : ""
    }
});

module.exports = mongoose.model('products', productSchema);