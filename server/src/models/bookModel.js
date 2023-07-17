const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    pageCount: {
        type: Number,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publisher',
        required: true,
    },
    bookCover: {
        type: String,
        required: true,
    },
    bookDescription: {
        type: String,
        required: true,
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };
