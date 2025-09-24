const mongoose = require('mongoose');

// Define the schema for a service
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Price cannot be a negative number
  },
  duration: {
    type: String,
    required: true // e.g., "30 minutes", "1 hour"
  },
  category: {
    type: String,
    required: true
  }
});

// Create the Mongoose model from the schema
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;