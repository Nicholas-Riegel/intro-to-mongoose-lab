// require mongoose
const mongoose = require('mongoose');

// create schema
const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
});


// create model 
const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
