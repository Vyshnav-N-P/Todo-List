    const mongoose = require('mongoose');
    // Connect to MongoDB
    mongoose.connect('mongodb://localhost:27017/TO-DO');

    // Event listeners for Mongoose connection
    mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
    });

    // Export Mongoose instance
    module.exports = mongoose;
