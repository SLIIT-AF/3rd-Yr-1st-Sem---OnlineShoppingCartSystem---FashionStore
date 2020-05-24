const mongoose = require('mongoose')

var commments = mongoose.model('com',{
    product : {type:String},
    name : {type:String},
    email : {type:String},
    rating : {type:Number},
    comment : {type:String},
})

module.exports = { commments }