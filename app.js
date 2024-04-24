const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const Customer = require('./models/customer.js');

let appRunning = true;

let customerName = null;
let customerAge = null;
let customerId = null;

const createCustomer = async () => {

    customerName = prompt("Please enter the customer's name: ")

    customerAge = prompt("Please enter the customer's age: ")

    const customerData = {
      name: customerName,
      age: customerAge,
    };
    
    const customer = await Customer.create(customerData);

    console.clear()
    console.log("New customer:");
    console.log('===========================================');
    console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    console.log('===========================================');
};

const findCustomers = async () => {
    
    const customers = await Customer.find({});
    
    console.clear()
    console.log("All customers:");
    console.log('===========================================');
    customers.forEach(customer => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    })
    console.log('===========================================');
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

    console.clear()
    console.log("Updated customer:");
    console.log('===========================================');
    console.log(`id: ${updatedCustomer._id} -- Name: ${updatedCustomer.name}, Age: ${updatedCustomer.age}`);
    console.log('===========================================');
};

const deleteCustomer = async () => {

    await findCustomers();

    customerId = prompt("Please enter the id of the customer you want to delete from the list above: ")

    const removedCustomer = await Customer.findByIdAndDelete(customerId);
    
    console.clear()
    console.log("Removed customer:");
    console.log('===========================================');
    console.log(`id: ${removedCustomer._id} -- Name: ${removedCustomer.name}, Age: ${removedCustomer.age}`);
    console.log('===========================================');
}


const connect = async () => {

    await mongoose.connect(process.env.MONGODB_URI);

    // console.log('Connected to MongoDB');
};

const disconnect = async () => {

    await mongoose.disconnect();

    console.log('Disconnected from MongoDB\nBye!');

    process.exit();
}

const app = async () => {

    console.clear()

    connect()

    console.log("Welcome to the raddest CRM ever!");

    while(appRunning){

        console.log("What would you like to do?\n1. Create a customer\n2. View all customers\n3. Update a customer\n4. Delete a customer\n5. Quit");
        
        const userAnswer = prompt("Number of action to run: ");
        
        if ( parseInt(userAnswer) === 1){    
            await createCustomer()
        } else if (parseInt(userAnswer) === 2){
            await findCustomers()
        } else if (parseInt(userAnswer) === 3){
            await updateCustomer()
        } else if (parseInt(userAnswer) === 4){
            await deleteCustomer()
        } else if (parseInt(userAnswer) === 5){
            await disconnect()
            appRunning = false;
        }
    }
}
    

app()