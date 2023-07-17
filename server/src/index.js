const express = require('express');
const app = express();
const cors = require('cors');

const connectToDatabase = require('./database/connection.js');
const config = require('./config.js');

const authorRoutes = require('./routes/authorRoutes.js');
const publisherRoutes = require('./routes/publisherRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1', authorRoutes);
app.use('/api/v1', publisherRoutes);
app.use('/api/v1', bookRoutes)

// Spin up server
const port = config.development.port || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Connect to database
connectToDatabase();