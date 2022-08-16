const router = require('express').Router();
const Sale = require("../models/sale.model");
const Supplier = require("../models/supplier.model");

// Get request to retrieve details
router.route('/').get((req, res) => {
  Sale.find()
    .then(suppliers => res.json(suppliers))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/order-count').get((req, res) => {
  Sale.count({'customerId': {$ne:'null'}})
      .then(suppliers => res.json(suppliers))
      .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/order-list').get((req, res) => {
  Sale.find({'customerId': {$ne:'null'}})
      .then(suppliers => res.json(suppliers))
      .catch(err => res.status(400).json('Error: ' + err));
});

// Post request to add details
router.route('/add').post((req, res) => {

  console.log(req.body);
  const {
    customerId,
    customerName,
    deliveryAddress,
    mobile,
    total,
    items,
    orderDate,
    issueDate,
    paymentMethod,
    status
  } = req.body;

  const newSalesOrder = new Sale({
    customerId,
    customerName,
    deliveryAddress,
    mobile,
    total,
    items,
    orderDate,
    issueDate,
    paymentMethod,
    status
  });

  newSalesOrder.save()
      .then(() => res.json('Sales Bill added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
