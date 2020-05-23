const express = require('express')
const router = express.Router();
// const multer  = require('multer');

//Bring In Product Model
const Product = require('../../models/Product');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}_${file.originalname}`)
//     },
//     fileFilter: (req, file, cb) => {
//         const ext = path.extname(file.originalname)
//         if (ext !== '.jpg' || ext !== '.png') {
//             return cb(res.status(400).end('only jpg, png are allowed'), false);
//         }
//         cb(null, true)
//     }
// })

// const upload = multer({ storage: storage }).single("file")


//@route GET api/products
//@desc Get All Products
//@access Public
router.get('/', (req, res) => {
    Product.find()
    .then(products => res.json(products))
})

//@route POST api/products
//@desc Create a product
//@access Private
router.post('/', (req, res, next) => {
    const newProduct = new Product({
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