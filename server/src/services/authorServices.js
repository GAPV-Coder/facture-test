const { Author } = require('../models/authorModel.js');

const findMatchAuthor = async (query) => {
    const matched = await Author.findOne(query);
    return !! matched;
};

module.exports = findMatchAuthor;