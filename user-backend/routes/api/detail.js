const express = require('express')
const router = express.Router();

const Detail = require('../../models/Detail');

router.get('/', (req, res) => {
    Detail.find()
    .then(products => res.json(products))
})

router.post('/', (req, res, next) => {
    const newDetail = new Detail({
        title: req.body.title,
        productPic: req.body.productPic,
        price: req.body.price,
        company: req.body.company,
        info: req.body.info,
        incart: req.body.incart,
        count: req.body.count,
        total: req.body.total
    });

    newDetail.save()
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