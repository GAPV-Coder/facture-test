const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    cityOfBirth: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
