const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Customer = require('./models/customer');
const Service = require('./models/service');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/UBI_PORTAL';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB is connected successfully!');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// API Endpoints for Customers
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/customers', async (req, res) => {
  // Creating a new customer document with data from the request body
  // The 'req.body' should contain a 'name' field
  const customer = new Customer(req.body);
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// New API endpoint to add multiple customers in one go
app.post('/api/customers/bulk', async (req, res) => {
  try {
    // req.body should be an array of customer objects
    const customers = await Customer.insertMany(req.body);
    res.status(201).json(customers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// New API endpoint to add multiple services in one go
app.post('/api/services/bulk', async (req, res) => {
  try {
    // req.body should be an array of service objects
    const services = await Service.insertMany(req.body);
    res.status(201).json(services);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API Endpoints for Services
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/services', async (req, res) => {
  const service = new Service(req.body);
  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
