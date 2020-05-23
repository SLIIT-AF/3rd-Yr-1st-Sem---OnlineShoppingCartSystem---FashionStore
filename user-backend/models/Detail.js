const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');



const DetailSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    // img: {
    //     data: Buffer, 
    //     contentType: String
    // },
    productPic: [
        {
            img: String
        }
    ],
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
    count: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    }

})

module.exports = Detail = mongoose.model('Detail', DetailSchema)