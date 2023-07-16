const { validationResult } = require('express-validator');
const { Author } = require('../models/authorModel.js');

const createAuthor = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { fullName, birthDate, cityOfBirth, email } = req.body;

        const author = await Author.create({
            fullName,
            birthDate,
            cityOfBirth,
            email,
        });

        res.status(201).json({ author });
    } catch (error) {
        console.error('Error creating author:', error);
        res.status(500).json({
            error: 'An error occurred while creating the author',
        });
    }
};

const getAuthors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 12;

        const authors = await Author.find()
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({ authors });
    } catch (error) {
        console.error('Error getting authors:', error);
        res.status(500).json({
            error: 'An error occurred when obtaining the authors',
        });
    }
};

const getAuthorByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: 'You must provide an author name' });
        }

        const authors = await Author.find({ fullName: name }).exec();

        res.json({ authors });
    } catch (error) {
        console.error('Error retrieving author by name:', error);
        res.status(500).json({
            error: 'An error occurred when retrieving the author by name',
        });
    }
};

const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const {
                fullName,
                birthDate,
                cityOfBirth,
                email
        } = req.body;

        const updatedAuthor = await Author.findByIdAndUpdate(
            id,
            {
                fullName,
                birthDate,
                cityOfBirth,
                email
            },
            { new: true },
        );

        res.json({ author: updatedAuthor });
    } catch (error) {
        console.error('Error updating the author:', error);
        res.status(500).json({
            error: 'An error occurred while updating the author',
        });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        await Author.findByIdAndRemove(id);
        res.json({ message: 'Author successfully removed' });
    } catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({
            error: 'An error occurred while deleting the author',
        });
    }
};

module.exports = {
    createAuthor,
    getAuthors,
    getAuthorByName,
    updateAuthor,
    deleteAuthor
};
