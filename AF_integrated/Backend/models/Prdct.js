const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');

const PrdctSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    // img: {
    //     data: Buffer, 
    //     contentType: String
    // },
    productPic: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    inCart: {
        type: Boolean,
        default: false
    },
    inWishlist: {
        type: Boolean,
        default: false
    },
    count: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    }

})

module.exports = Prdct = mongoose.model('Prdct', PrdctSchema)