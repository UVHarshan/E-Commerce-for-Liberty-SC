const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reqString = {
    type: String,
    required: true
}

const orderItems = new Schema({
    brand: reqString,
    item: reqString,
    quantity: reqString
})

const supOrderSchema = new Schema({
    supplier: reqString,
    order: [orderItems]
});

// Creating a model 
const SupplyOrder = mongoose.model('SupplyOrder', supOrderSchema);

module.exports = SupplyOrder;



///// Problem with product list................