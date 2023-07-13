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
    } finally {
        await closeDatabaseConnection();
    }
};

const closeDatabaseConnection = async () => {
    try {
        await mongoose.connection.close();
        console.log('Connection closed successfully');
    } catch (error) {
        console.error('Error closing connection:', error);
    }
};

module.exports = connectToDatabase;