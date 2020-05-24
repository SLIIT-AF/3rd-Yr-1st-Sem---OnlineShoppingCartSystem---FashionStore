const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId

var { commments } = require('../models/comments')

router.get('/',(req,res)=>{
    commments.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/',(req,res)=>{
    var com= new commments({
        product: req.body.product,
        rating: req.body.rating,
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
    })

    com.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    var com={
        comment: req.body.comment,
        rating: req.body.rating
    }

    commments.findByIdAndUpdate(req.params.id, { $set: com},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    commments.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router