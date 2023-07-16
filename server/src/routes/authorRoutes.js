const express = require('express');
const router = express.Router();
const {
    createAuthor,
    getAuthors,
    getAuthorByName,
    updateAuthor,
    deleteAuthor,
} = require('../controllers/authorController.js');
const {
    updateAuthorValidation,
    createAuthorValidation,
} = require('../validators/authorValidator.js');

// Create author
router.post('/authors', createAuthorValidation, createAuthor);

// Get all authors
router.get('/authors', getAuthors);

// Get author by name
router.get('/authors/:name', getAuthorByName);

// Update author
router.put('/authors/:id', updateAuthorValidation, updateAuthor);

// Delete author
router.delete('/authors/:id', deleteAuthor);

module.exports = router;