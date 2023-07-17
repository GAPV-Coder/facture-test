const { Author } = require('../models/authorModel.js');
const { Publisher } = require('../models/publisherModel.js');
const { Book } = require('../models/bookModel.js');

const validateAuthorAndPublisherExistence = async (authorId, publisherId) => {
    const authorExists = await Author.exists({ _id: authorId });
    const publisherExists = await Publisher.exists({ _id: publisherId });

    return {
        authorExists,
        publisherExists,
    };
};

const findMatchBook = async (query) => {
    const matched = await Book.findOne(query);
    return !!matched;
};

module.exports = {
    validateAuthorAndPublisherExistence,
    findMatchBook,
};
