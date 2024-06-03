const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('./db'); 
const listroutes=require('./routes/listRoutes')
// Middleware setup
app.use(cors({
    credentials: true,
    origin: "http://localhost:4200",
}));

app.use(express.json({limit: '200mb'}));
app.use(bodyParser.json());

// Routes
app.use('/showlist',listroutes);


// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}!`);
    
    // Check if Mongoose connected successfully
    mongoose.connection.once('open', () => {
        console.log('MongoDB connection established successfully.');
    });

    // Error handling for Mongoose connection
    mongoose.connection.on('error', err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the application if MongoDB connection fails
    });
});
