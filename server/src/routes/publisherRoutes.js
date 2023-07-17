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

/**
 * @swagger
 * tags:
 *   name: Publishers
 *   description: Operations related to publishers.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Publisher:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Publisher name.
 *         correspondenceAddress:
 *           type: string
 *           description: Publisher's correspondence address.
 *         phone:
 *           type: string
 *           description: Publisher's phone number.
 *         email:
 *           type: string
 *           format: email
 *           description: Publisher's email address.
 *         maxBooksRegistered:
 *           type: number
 *           description: Maximum number of books registered by the publisher.
 */

/**
 * @swagger
 * /publisher:
 *   post:
 *     summary: Create a new publisher.
 *     tags: [Publishers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Publisher'
 *     responses:
 *       201:
 *         description: Publisher created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 publisher:
 *                   $ref: '#/components/schemas/Publisher'
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
router.post('/publisher', createPublisherValidations, createPublisher);

/**
 * @swagger
 * /publisher:
 *   get:
 *     summary: Get all publishers.
 *     tags: [Publishers]
 *     responses:
 *       200:
 *         description: List all publishers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Publisher'
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
router.get('/publisher', getAllPublishers);

/**
 * @swagger
 * /publisher/search:
 *   get:
 *     summary: Get a publisher by name.
 *     tags: [Publishers]
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Name of the publisher to search for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publisher found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publisher'
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
 *         description: Publisher not found.
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
router.get('/publisher/search', getPublisherByName);

/**
 * @swagger
 * /publisher/{id}:
 *   put:
 *     summary: Update an existing publisher.
 *     tags: [Publishers]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the publisher to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Publisher'
 *     responses:
 *       200:
 *         description: Publisher updated correctly.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 publisher:
 *                   $ref: '#/components/schemas/Publisher'
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
 *         description: Publisher does not exist in the database.
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
router.put('/publisher/:id', updatePublisherValidations, updatePublisher);

/**
 * @swagger
 * /publisher/{id}:
 *   delete:
 *     summary: Delete an existing publisher.
 *     tags: [Publishers]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the publisher to update.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publisher successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       404:
 *         description: Publisher does not exist in the database.
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
router.delete('/publisher/:id', deletePublisher);

module.exports = router;
