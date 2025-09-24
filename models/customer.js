const mongoose = require('mongoose');

// Define the schema for a Customer
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  phone: String,
  address: {
    city: String,
    zip: String
  },
  // New field to store the last used time
  lastUsedAt: {
    type: Date,
    default: Date.now // Default value is the current time
  }
});

// Export the model
module.exports = mongoose.model('Customer', customerSchema);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
