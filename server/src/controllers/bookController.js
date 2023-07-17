const { validationResult } = require('express-validator');
const { Book } = require('../models/bookModel.js');
const {
    validateAuthorAndPublisherExistence,
} = require('../services/bookServices.js');

const createBook = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            year,
            genre,
            pageCount,
            author,
            publisher,
            bookCover,
            bookDescription,
        } = req.body;

        const { authorExists, publisherExists } =
            await validateAuthorAndPublisherExistence(author, publisher);

        if (!authorExists) {
            return res.status(404).json({ error: 'The author does not exist' });
        }

        if (!publisherExists) {
            return res
                .status(404)
                .json({ error: 'The publisher does not exist' });
        }

        const book = await Book.create({
            title,
            year,
            genre,
            pageCount,
            author,
            publisher,
            bookCover,
            bookDescription,
        });

        res.status(201).json({ book });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({
            error: 'An error occurred while creating the book',
        });
    }
};

const getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('author publisher');
        res.json(books);
    } catch (error) {
        console.error('Error fetching all books:', error);
        res.status(500).json({
            error: 'An error occurred while fetching all books',
        });
    }
};

const getBook = async (req, res) => {
    try {
        const { title, authorName, publisherName } = req.query;

        if (!title && !authorName && !publisherName) {
            return res.status(400).json({
                error: 'Please provide at least one search option (title, authorName, or publisherName)',
            });
        }

        let query = {};

        if (title) {
            query.title = title;
        }

        if (authorName) {
            query['author.fullName'] = authorName;
        }

        if (publisherName) {
            query['publisher.name'] = publisherName;
        }

        const book = await Book.findOne(query).populate('author publisher');

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({
            error: 'An error occurred while fetching book',
        });
    }
};

const editBook = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            year,
            genre,
            numPages,
            author,
            publisher,
            bookCover,
            bookDescription,
        } = req.body;

        const { authorExists, publisherExists } =
            await validateAuthorAndPublisherExistence(author, publisher);

        if (!authorExists) {
            return res.status(404).json({ error: 'The author does not exist' });
        }

        if (!publisherExists) {
            return res
                .status(404)
                .json({ error: 'The publisher does not exist' });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            {
                title,
                year,
                genre,
                numPages,
                author,
                publisher,
                bookCover,
                bookDescription,
            },
            { new: true }, // To return the updated book in the response
        ).populate('author publisher');

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json(updatedBook);
    } catch (error) {
        console.error('Error editing book:', error);
        res.status(500).json({
            error: 'An error occurred while editing book',
        });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({
            error: 'An error occurred while deleting book',
        });
    }
};

module.exports = {
    createBook,
    getBooks,
    getBook,
    editBook,
    deleteBook,
};
