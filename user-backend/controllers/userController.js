const express = require('express');
var router = express.Router()
const nodemailer = require("nodemailer");
var ObjectID= require('mongoose').Types.ObjectId
var nodeBase64 = require('nodejs-base64-converter');
var { UserRecord } = require('../models/user')
let multer  = require('multer');

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName+localStorage.getItem('uid'))
        console.log("storage filename :"+fileName);
        console.log("storage id :"+localStorage.getItem('uid'));
    }
});

const uplaod = multer({
    storage: storage,
    fileFilter: (req,file,cb) => {
        if (file.mimeType === "image/png" || file.mimeType === "image/jpg" || file.mimeType === "image/jpeg"){
            cb(null,true);
        }else{
            cb(null,false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});



router.get('/',(req,res)=>{
    UserRecord.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.get('/:id', (req,res) => {

    UserRecord.findById(req.params.id,(err, docs) =>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err, undefined, 2))
        }
    })
})

router.post('/send_email',(req,res)=>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'fashionstore.proj@gmail.com',
          pass: 'fashionstore123'
        }
      });

    var mailOption ={
        from: 'fashionstore.proj@gmail.com',
        to: req.body.email,
        subject: "privilege change",
        text: "privilege change to store manager"
      }
    
      transporter.sendMail(mailOption,function(err,inf){
        if(err){
            res.send(err);
            console.log("Error");
        }else{
            res.send(inf.response);
            console.log("success");
        }
      });
    
})

router.post('/',(req,res)=>{

    var record = new UserRecord({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : nodeBase64.encode(req.body.password),
        type : 'user',
        image : null
    })

    record.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.put('/:id',  (req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }
    var records={
        type : req.body.type
    }

    UserRecord.findByIdAndUpdate(req.params.id, { $set: records },{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.put('/edit/:id', uplaod.single('image'), (req,res,next) => {
    console.log("id :"+req.params.id);

    const url = req.protocol + '://' + req.get('host');
    console.log("url :"+url);

    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id :'+ req.params.id)
    }
    var records = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password,
        image : url+'/public/'+ req.body.image
    }

    UserRecord.findByIdAndUpdate(req.params.id, {$set : records } ,{new : true}, (err, docs) =>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err, undefined, 2))
        }
    })

})

router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record this id : '+req.params.id)
    }

    UserRecord.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router
