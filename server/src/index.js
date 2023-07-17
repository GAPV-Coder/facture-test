const express = require('express');
const app = express();
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const connectToDatabase = require('./database/connection.js');
const config = require('./config.js');

const authorRoutes = require('./routes/authorRoutes.js');
const publisherRoutes = require('./routes/publisherRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');

app.use(express.json());
app.use(cors());

// Swagger specification's
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Test Facture: Search library',
            version: '1.0.0',
            description:
                'API to perform search and CRUD operations for books, authors and publishers.',
        },
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

// Routes
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/api/v1', authorRoutes);
app.use('/api/v1', publisherRoutes);
app.use('/api/v1', bookRoutes);

// Spin up server
const port = config.development.port || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Connect to database
connectToDatabase();
