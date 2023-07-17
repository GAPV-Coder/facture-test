const express = require('express');
const router = express.Router();
const { createBook, getBooks, getBook, editBook, deleteBook } = require('../controllers/bookController.js');
const { createBookValidation, updateBookValidation } = require('../validators/bookValidator.js');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Operations related to books.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Book title.
 *         year:
 *           type: number
 *           description: Year of publication of the book.
 *         genre:
 *           type: string
 *           description: Book genre.
 *         pageCount:
 *           type: number
 *           description: Number of pages in the book.
 *         author:
 *           type: string
 *           description: Book author ID.
 *         publisher:
 *           type: string
 *           description: Book publisher ID.
 *         bookCover:
 *           type: string
 *           description: Book cover (image URL).
 *         bookDescription:
 *           type: string
 *           description: Book description.
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book.
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 book:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation error. Returns a list of errors if the data provided is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Error message.
 *       404:
 *         description: The provided author or publisher does not exist in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.post('/books', createBookValidation, createBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books.
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List all books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.get('/books', getBooks);

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Get a book by title, author or publisher.
 *     tags: [Books]
 *     parameters:
 *       - name: title
 *         in: query
 *         description: Title of the book to search for.
 *         schema:
 *           type: string
 *       - name: authorName
 *         in: query
 *         description: Name of the author of the book you are looking for.
 *         schema:
 *           type: string
 *       - name: publisherName
 *         in: query
 *         description: Name of the publisher of the book you are looking for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation error. Returns an error message if no valid search parameters are provided..
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.get('/books/search', getBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update an existing book.
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated correctly.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 book:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation error. Returns a list of errors if the data provided is invalid..
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Error message.
 *       404:
 *         description: Book does not exist in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.put('/books/:id', updateBookValidation, editBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete an existing book.
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book to update.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       404:
 *         description: Book does not exist in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.delete('/books/:id', deleteBook);

module.exports = router;
