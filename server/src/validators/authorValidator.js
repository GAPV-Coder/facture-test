const { check } = require('express-validator');
const findMatchAuthor = require('../services/authorServices.js');

const createAuthorValidation = [
    check('fullName', 'Enter a full name')
        .exists()
        .withMessage('Full name is required')
        .custom(async (value) => {
            const matchedAuthorName = await findMatchAuthor({ fullName: value });
            if (matchedAuthorName) {
                throw new Error('Author name already exists');
            } else {
                return true;
            }
        })
        .trim()
        .escape(),
    check('birthDate', 'Enter a birth date')
        .exists()
        .notEmpty()
        .withMessage('Birth date is required'),
    check('cityOfBirth', 'Enter a city of birth date')
        .exists()
        .notEmpty()
        .withMessage('City of birth date is required'),
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is invalid'),
];

const updateAuthorValidation = [
    check('fullName', 'Enter a full name')
        .exists()
        .withMessage('Full name is required'),
    check('birthDate', 'Enter a birth date')
        .exists()
        .notEmpty()
        .withMessage('Birth date is required'),
    check('cityOfBirth', 'Enter a city of birth date')
        .exists()
        .notEmpty()
        .withMessage('City of birth date is required'),
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is invalid'),
];

module.exports = {
    createAuthorValidation,
    updateAuthorValidation,
};