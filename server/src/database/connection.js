const mongoose = require('mongoose');
const config = require('../config.js');

const DB_URI =  config.development.mongoUri;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successful database connection');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

module.exports = connectToDatabase;