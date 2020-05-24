const express = require('express');
const productSchema = require('../models/product_schema');
const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const products = await productSchema.find();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/brand/:brandName', async(req, res) => {
    const brandName  = req.params.brandName;
    try {
        const products = await productSchema.find({ productBrand : { $regex : brandName, $options : "i"}});
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/category/:category', async(req, res) => {
    const category = req.params.category;
    try {
        const products = await productSchema.find({ product_category : { $regex : category, $options: "i"} });
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post('/', async(req, res) => {
    const productName =  req.body.product_name;
    const productBrand = req.body.product_brand;
    const productDescription = req.body.product_description;
    const productCategory = req.body.product_category;
    const productUnitPrice = req.body.product_unitprice;
    const productDiscount = req.body.product_discount;
    const productSupplierName = req.body.product_supplierName;
    let productExpirationDate = req.body.product_expirationDate;
    let productAverageRating = req.body.product_averageRating;
    let productExpirationStatus;

    if(productExpirationDate === undefined || productExpirationDate === null ){
        productExpirationDate = "NA";
        productExpirationStatus = "NA";
    }

    const product = new productSchema({
        productName: productName,
        productBrand: productBrand,
        productDescription: productDescription,
        product_category: productCategory,
        product_unitprice: productUnitPrice,
        product_discount: productDiscount,
        supplier_name: productSupplierName,
        product_expirationDate: productExpirationDate,
        product_expirationStatus: productExpirationStatus,
        product_averageRating : productAverageRating
    });

    await product.save()
    .then( data => {
        res.status(200).json(data);
    })
    .catch( err => {
        res.status(500).json(err);
    });
});

router.delete('/:productId', async(req, res) => {
    const productId = req.params.productId;
    try{
        const deletedProduct = await productSchema.findByIdAndDelete(productId);
        res.status(200).json(deletedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;