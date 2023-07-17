const { check } = require('express-validator');
const { findMatchBook } = require('../services/bookServices.js');

const createBookValidation = [
    check('title', 'Enter a title')
        .exists()
        .withMessage('Title is required')
        .custom(async (value) => {
            const matchedBookTitle = await findMatchBook({ title: value });
            if (matchedBookTitle) {
                throw new Error('Book title already exists');
            } else {
                return true;
            }
        })
        .trim()
        .escape(),
    check('year', 'Enter a valid year')
        .exists()
        .notEmpty()
        .withMessage('Year is required')
        .isInt({ min: 1000, max: 9999 })
        .withMessage('Year must be a 4-digit number between 1000 and 9999'),
    check('genre', 'Enter a genre')
        .exists()
        .notEmpty()
        .withMessage('Genre is required'),
    check('pageCount', 'Enter a valid number of pages')
        .exists()
        .notEmpty()
        .withMessage('Number of pages is required')
        .isInt({ min: 1 })
        .withMessage('Number of pages must be a positive integer'),
    check('author', 'Enter a valid author ID')
        .exists()
        .notEmpty()
        .withMessage('Author ID is required')
        .isMongoId()
        .withMessage('Invalid author ID'),
    check('publisher', 'Enter a valid publisher ID')
        .exists()
        .notEmpty()
        .withMessage('Publisher ID is required')
        .isMongoId()
        .withMessage('Invalid publisher ID'),
];

const updateBookValidation = [
    check('title', 'Enter a title').exists().withMessage('Title is required'),
    check('year', 'Enter a valid year')
        .exists()
        .notEmpty()
        .withMessage('Year is required')
        .isInt({ min: 1000, max: 9999 })
        .withMessage('Year must be a 4-digit number between 1000 and 9999'),
    check('genre', 'Enter a genre')
        .exists()
        .notEmpty()
        .withMessage('Genre is required'),
    check('numPages', 'Enter a valid number of pages')
        .exists()
        .notEmpty()
        .withMessage('Number of pages is required')
        .isInt({ min: 1 })
        .withMessage('Number of pages must be a positive integer'),
    check('authorId', 'Enter a valid author ID')
        .exists()
        .notEmpty()
        .withMessage('Author ID is required')
        .isMongoId()
        .withMessage('Invalid author ID'),
    check('publisherId', 'Enter a valid publisher ID')
        .exists()
        .notEmpty()
        .withMessage('Publisher ID is required')
        .isMongoId()
        .withMessage('Invalid publisher ID'),
];

module.exports = {
    createBookValidation,
    updateBookValidation,
};
