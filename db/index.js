const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/userDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB successfully');

        // Set up connection event handlers
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected from MongoDB');
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;




















// const mongoose = require('mongoose');
// const jwt= require("jsonwebtoken");
// //const bcrypt = require('bcrypt');

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/userDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB successfully');
// }).catch((err) => {
//     console.error('MongoDB connection error:', err);
// });

// module.exports= mongoose;  