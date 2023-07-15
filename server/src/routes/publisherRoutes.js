const express = require('express');
const router = express.Router();

const {
    createPublisher,
    getAllPublishers,
    getPublisherByName,
    updatePublisher,
    deletePublisher,
} = require('../controllers/publisherController.js');

const { createPublisherValidations, updatePublisherValidations } = require('../validators/publisherValidator.js');

// Create publisher
router.post('/publisher', createPublisherValidations, createPublisher);

// Get all publishers
router.get('/publisher', getAllPublishers);

// Get publisher by name
router.get('/publisher/:name', getPublisherByName);

// Update publisher
router.put('/publisher/:id', updatePublisherValidations, updatePublisher);

// Delete publisher
router.delete('/publisher/:id', deletePublisher);

module.exports = router;
