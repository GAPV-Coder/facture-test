const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    correspondenceAddress: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    maxBooksRegistered: {
        type: Number,
        default: -1,
    },
});

const Publisher = mongoose.model('Publisher', publisherSchema);

module.exports = Publisher;
