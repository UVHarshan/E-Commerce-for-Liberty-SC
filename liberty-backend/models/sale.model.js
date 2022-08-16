const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reqString = {
    type: String,
    required: true
}

const salesSchema = new Schema({
    customerId:reqString,
    customerName: reqString,
    deliveryAddress: reqString,
    mobile: reqString,
    total: {type:Number, required: true},
    items: [{
        brand: reqString,
        item: reqString,
        price: reqString,
        quantity: {type:Number, required: true}
    }],
    orderDate: {type: Date, required: true},
    issueDate: reqString,
    paymentMethod: reqString,
    status: reqString,
});

// Creating a model
const Sale = mongoose.model('Sale', salesSchema);

module.exports = Sale;
