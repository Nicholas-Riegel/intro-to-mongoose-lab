const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer.js');

console.log("Welcome to the CRM\nWhat would you like to do?\n1. Create a customer\n2. View all customers\n3. Update a customer\n4. Delete a customer\n5. quit");
const userAnswer = prompt("Number of action to run: ");

let customerName = null;
let customerAge = null;

const createCustomer = async () => {
    customerName = prompt("Please enter the customer's name: ")
    customerAge = prompt("Please enter the customer's age: ")
    const customerData = {
      name: customerName,
      age: customerAge,
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
    await findCustomers();
    customerId = prompt("Please enter the id of the customer you want to update from the list above: ")
    customerName = prompt("Please enter the customer's new name: ")
    customerAge = prompt("Please enter the customer's new age: ")
    const updatedCustomer = await Customer.findByIdAndUpdate(
        customerId,
        { 
            name: customerName,
            age: customerAge  
        },
        { new: true }
    );
    console.log("Updated Customer:", updatedCustomer);
};

const deleteCustomer = async () => {
    await findCustomers();
    customerId = prompt("Please enter the id of the customer you want to delete from the list above: ")
    const removedCustomer = await Customer.findByIdAndDelete(customerId);
    console.log('Removed customer:', removedCustomer)
}


const connect = async (query) => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await query()
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit();
};

let customerId = null;

if ( parseInt(userAnswer) === 1){    
    connect(createCustomer)
} else if (parseInt(userAnswer) === 2){
    connect(findCustomers)
} else if (parseInt(userAnswer) === 3){
    connect(updateCustomer)
} else if (parseInt(userAnswer) === 4){
    connect(deleteCustomer)
} else if (parseInt(userAnswer) === 5){
    console.log("Bye!");
}
