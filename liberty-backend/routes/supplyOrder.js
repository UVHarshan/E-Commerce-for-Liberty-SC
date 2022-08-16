const router = require('express').Router();
let SupplyOrder = require('../models/supplyOrder.model');

// Get request to retrieve details
router.route('/').get((req, res) => {
  Supplier.find()
    .then(suppliers => res.json(suppliers))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Post request to add details
router.route('/add').post((req, res) => {

  const {supplier, order} = req.body;

  const newSuppplyOrder = new SupplyOrder({
    supplier,
    order
  });

  newSuppplyOrder.save()
    .then(() => res.json('Supply Order added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;