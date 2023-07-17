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

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Operations related to authors.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           description: Full name of the author.
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Date of birth of the author.
 *         cityOfBirth:
 *           type: string
 *           description: City of birth of the author.
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the author.
 */

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author.
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Author created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 author:
 *                   $ref: '#/components/schemas/Author'
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
router.post('/authors', createAuthorValidation, createAuthor);

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors.
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List all authors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
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
router.get('/authors', getAuthors);

/**
 * @swagger
 * /authors/search:
 *   get:
 *     summary: Get an author by name.
 *     tags: [Authors]
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Name of the author to search for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Validation error. Returns an error message if no valid search parameters are provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       404:
 *         description: Author not found.
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
router.get('/authors/search', getAuthorByName);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an existing author.
 *     tags: [Authors]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the author to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated correctly.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 author:
 *                   $ref: '#/components/schemas/Author'
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
 *         description: Author does not exist in the database.
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
router.put('/authors/:id', updateAuthorValidation, updateAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an existing author.
 *     tags: [Authors]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the author to update.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       404:
 *         description: Author does not exist in the database.
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
router.delete('/authors/:id', deleteAuthor);

module.exports = router;
