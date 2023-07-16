const { body, check } = require('express-validator');
const findMatchPublisher = require('../services/publisherServices.js');

const createPublisherValidations = [
    check('name', 'Enter a name')
        .exists()
        .withMessage('Name is required')
        .custom(async (value) => {
            const matchedPublisherName = await findMatchPublisher({name: value});
            if (matchedPublisherName) {
                throw new Error('Publisher name already exists')
            } else {
                return true;
            }
        })
        .trim()
        .escape(),
    check('correspondenceAddress')
        .notEmpty()
        .withMessage('The correspondence address is mandatory'),
    check('phone')
        .notEmpty()
        .withMessage('The phone number is required'),
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is invalid'),
    check('maxBooksRegistered')
        .notEmpty()
        .withMessage('The maximum number of books registered is required')
        .isNumeric()
        .withMessage('Maximum books registered must be numeric'),
];

const updatePublisherValidations = [
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('correspondenceAddress')
        .optional()
        .notEmpty()
        .withMessage('The correspondence address is mandatory'),
    body('phone')
        .optional()
        .notEmpty()
        .withMessage('The phone number is required'),
    body('email')
        .optional()
        .notEmpty()
        .withMessage('Email must be required')
        .isEmail()
        .withMessage('Email is invalid'),
    body('maxBooksRegistered')
        .optional()
        .notEmpty()
        .withMessage('The maximum number of books registered is required')
        .isNumeric()
        .withMessage('Maximum books registered must be numeric'),
];

module.exports = {
    createPublisherValidations,
    updatePublisherValidations,
};
