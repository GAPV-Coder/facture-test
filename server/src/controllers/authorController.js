const { Author } = require('../models/authorModel.js');

const createAuthor = async (req, res) => {
    try {
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

module.exports = {
    createAuthor,
    getAuthors,
    getAuthorByName
};
