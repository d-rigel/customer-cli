const mongoose = require("mongoose");

//Map global promise - get rid of warning
mongoose.Promise = global.Promise;

//Connect to database
const db = mongoose.connect("mongodb://localhost:27017/customercli", {
  // useMongoClient: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Import model
const Customer = require("./models/customer");

//Add Customer
const addCustomer = (customer) => {
  Customer.create(customer)
    .then((customer) => {
      console.info("New Customer Added");
      // db.close();
    })
    .catch((err) => console.log(err));
};

//Find Customer
const findCustomer = (name) => {
  //Make case insensitive
  const search = new RegExp(name, "i");
  Customer.find({ $or: [{ firstname: search }, { lastname: search }] })
    .then((customer) => {
      console.info(customer);
      console.info(`${customer.length} matches`);
      // db.close();
    })
    .catch((err) => console.log(err));
};

//Update Customer
const updateCustomer = (_id, customer) => {
  Customer.updateOne({ _id }, customer)
    .then((customer) => {
      console.info("Customer Updated");
    })
    .catch((err) => {
      console.info(err);
    });
};

//Remove Customer
const removeCustomer = (_id) => {
  Customer.deleteOne({ _id })
    .then((customer) => {
      console.info("Customer Removed");
    })
    .catch((err) => {
      console.info(err);
    });
};

//List Customers
const listCustomers = () => {
  Customer.find()
    .then((customers) => {
      console.info(customers);
      console.info(`${customers.length} customers`);
    })
    .catch((err) => {
      console.info(err);
    });
};

module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers,
};
