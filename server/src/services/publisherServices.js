const { Publisher } = require('../models/publisherModel.js');

const findMatchPublisher = async (query) => {
    const matched = await Publisher.findOne(query);
    return !!matched;
};

module.exports = findMatchPublisher;
