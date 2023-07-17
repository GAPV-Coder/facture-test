const express = require('express');
const router = express.Router();
const { createBook, getBooks, getBook, editBook, deleteBook } = require('../controllers/bookController.js');
const { createBookValidation, updateBookValidation } = require('../validators/bookValidator.js');

// Create a new book
router.post('/books', createBookValidation, createBook);

// Get all books
router.get('/books', getBooks);

// Get a book by title, author or publisher
router.get('/books/search', getBook);

// Update a book
router.put('/books/:id', updateBookValidation, editBook);

// Delete book
router.delete('/books/:id', deleteBook);

module.exports = router;