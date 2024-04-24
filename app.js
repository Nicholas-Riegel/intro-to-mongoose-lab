const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer.js');

const prompt = require('prompt-sync')();
const username = prompt('What is your name? ');
console.log(`Your name is ${username}`);
const age = prompt('What is your age?')
console.log(`Your age is ${age}`);

const createCustomer = async () => {

    const customerData = {
      name: username,
      age: age,
    };
    
    const customer = await Customer.create(customerData);

    console.log("New customer:", customer);
};

const findCustomer = async () => {
    const id = ''
    const customer = await Customer.findById(id);
    console.log("The customer:", customer);
};

const findCustomers = async () => {
    
    const customers = await Customer.find({});
    
    console.log("All customers:", customers);
};
  
const updateCustomer = async () => {
    const id = '';
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { isComplete: true },
      { new: true }
    );
    console.log("Updated Customer:", updatedCustomer);
};

const deleteCustomer = async () => {
    const id = '';
    const removedCustomer = await Customer.findByIdAndDelete(id);
    console.log('Removed customer:', removedCustomer)
  }
  
const runQueries = async () => {
    await createCustomer();
    // await updateCustomer();
    // await deleteCustomer();
    console.log('Queries running.');
};
    
const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await runQueries()
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit();
};

connect()
