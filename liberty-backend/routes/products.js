const router = require('express').Router();
let Product = require('../models/product.model');
const {ObjectId} = require("bson");

// Get request to retrieve details
router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Post request to add details
router.route('/add').post((req, res) => {
    // const categoryId  = Number(req.body.categoryId);

    const {brand, item, category, image, price, quantity, expiryDate} = req.body;
    // const expiryDates = Date.parse(req.body.expiryDate);

    const newProduct = new Product({
        brand,
        item,
        category,
        image,
        price,
        quantity,
        expiryDate
    });

    newProduct.save()
        .then(() => res.json('Product added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Get Request to retrieve some data corresponding to a specific ID
router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Delete Request to delete records corresponding to a specific ID
router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Post Request to update records corresponding to a specific ID
router.route('/update/:_id').post((req, res) => {
    console.log(req.body);
    console.log(req.params)

    Product.updateOne({"_id": ObjectId(req.params._id)},
        [{
            $set: {
                "brand": req.body.brand,
                "item": req.body.item,
                "category": req.body.category,
                "price": req.body.price,
                "quantity": req.body.quantity,
                "expiryDate": req.body.expiryDate
            }
        }]).then(() => res.json('Product updated!'))
        .catch(err => res.status(400).json('Error: ' + err));

    // Product.findById(req.params._id)
    //     .then(product => {
    //         product.brand = req.body.brand;
    //         product.item = req.body.item;
    //         product.category = req.body.category;
    //         product.image = req.body.image;
    //         product.price = req.body.price;
    //         product.quantity = req.body.quantity;
    //         product.sales = req.body.sales;
    //         product.expiryDates = req.body.expiryDates;
    //         product.save()
    //             .then(() => res.json('Product updated!'))
    //             .catch(err => res.status(400).json('Error: ' + err));
    //     })
    //     .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
