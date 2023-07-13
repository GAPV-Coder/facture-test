const express = require('express');
const app = express();
const cors = require('cors');

const connectToDatabase = require('./database/connection.js');
const config = require('./config.js');

app.use(express.json());
app.use(cors());

// Spin up server
const port = config.development.port || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Connect to database
connectToDatabase();