const express = require('express');
const router = express.Router();
const { createAuthor, getAuthors, getAuthorByName } = require('../controllers/authorController.js');

// Create author
router.post('/authors', createAuthor);

// Get all authors
router.get('/', getAuthors);

// Get author by name
router.get('/authors', getAuthorByName);

module.exports = router;