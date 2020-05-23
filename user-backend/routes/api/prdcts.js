const express = require('express')
const router = express.Router();

//Bring In Product Model
const Prdct = require('../../models/Prdct');

//@route GET api/products
//@desc Get All Products
//@access Public
router.get('/', (req, res) => {
    Prdct.find()
    .then(products => res.json(products))
})

//@route POST api/products
//@desc Create a product
//@access Private
router.post('/', (req, res, next) => {
    const newProduct = new Prdct({
        title: req.body.title,
        productPic: req.body.productPic,
        price: req.body.price,
        company: req.body.company,
        info: req.body.info,
        incart: req.body.incart,
        inWishlist: req.body.inWishlist,
        count: req.body.count,
        total: req.body.total
    });

    newProduct.save()
        .then(product => {
            res.status(200).json({
                message: product
            });
        })
        .catch(er => {
            res.status(500).json({
                error: er
            });
        })
})

module.exports =  router;