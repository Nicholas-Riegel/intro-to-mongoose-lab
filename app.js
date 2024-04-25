const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const Customer = require('./models/customer.js');

let appRunning = true;

let customerName = null;
let customerAge = null;
let customerId = null;

const handleErrors = (err) => {

    console.clear()
    console.log('===========================================');
    console.log(`ERROR: ${err._message}`);
    console.log('===========================================');
}

const createCustomer = async () => {

    customerName = prompt("Please enter the customer's name: ")

    customerAge = prompt("Please enter the customer's age: ")

    const customerData = {
      name: customerName,
      age: customerAge,
    };
    
    try {
        
        const customer = await Customer.create(customerData);
        
        console.clear()
        console.log("New customer:");
        console.log('===========================================');
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
        console.log('===========================================');

    } catch (err){

        handleErrors(err)
    }

};

const findCustomers = async () => {
    
    try {

        const customers = await Customer.find({});
        
        console.clear()
        console.log("All customers:");
        console.log('===========================================');
        customers.forEach(customer => {
            console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
        })
        console.log('===========================================');
    
    } catch (err){

        handleErrors(err)
    }
};

const updateCustomer = async () => {

    await findCustomers();

    customerId = prompt("Please enter the id of the customer you want to update from the list above: ")
    customerName = prompt("Please enter the customer's new name: ")
    customerAge = prompt("Please enter the customer's new age: ")

    try {

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
    
    } catch (err){

        handleErrors(err)
    }
};

const deleteCustomer = async () => {

    await findCustomers();

    customerId = prompt("Please enter the id of the customer you want to delete from the list above: ")

    try {

        const removedCustomer = await Customer.findByIdAndDelete(customerId);
        
        console.clear()
        console.log("Removed customer:");
        console.log('===========================================');
        console.log(`id: ${removedCustomer._id} -- Name: ${removedCustomer.name}, Age: ${removedCustomer.age}`);
        console.log('===========================================');
    
    } catch (err){

        handleErrors(err)
    }
}


const connect = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_URI);
    
    } catch (err){

        handleErrors(err)
    }

};

const disconnect = async () => {

    try {

        await mongoose.disconnect();
        
        console.log('Disconnected from MongoDB\nBye!');
        
        process.exit();
    
    }catch (err){

        handleErrors(err)
    }
}

const app = async () => {

    console.clear()

    connect()

    console.log("Welcome to the raddest CRM ever!");

    while(appRunning){

        console.log("What would you like to do?\n1. Create a customer\n2. View all customers\n3. Update a customer\n4. Delete a customer\n5. Quit");
        
        const userAnswer = prompt("Number of action to run: ");
        
        if (userAnswer === '1'){    
            await createCustomer()
        } else if (userAnswer === '2'){
            await findCustomers()
        } else if (userAnswer === '3'){
            await updateCustomer()
        } else if (userAnswer === '4'){
            await deleteCustomer()
        } else if (userAnswer === '5'){
            await disconnect()
            appRunning = false;
        }
    }
}
    

app()