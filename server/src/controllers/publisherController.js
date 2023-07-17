const { validationResult } = require('express-validator');
const { Publisher } = require('../models/publisherModel.js');

const createPublisher = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            correspondenceAddress,
            phone,
            email,
            maxBooksRegistered,
        } = req.body;

        const publisher = await Publisher.create({
            name,
            correspondenceAddress,
            phone,
            email,
            maxBooksRegistered,
        });

        res.status(201).json({ publisher });
    } catch (error) {
        console.error('Error creating the publisher:', error);
        res.status(500).json({
            error: 'An error occurred while creating the publisher',
        });
    }
};

const getAllPublishers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 12;

        const totalPublishers = await Publisher.countDocuments();
        const totalPages = Math.ceil(totalPublishers / limit);
        const skip = (page - 1) * limit;

        const publishers = await Publisher.find().skip(skip).limit(limit);

        res.json({
            publishers,
            currentPage: page,
            totalPages,
        });
    } catch (error) {
        console.error('Error obtaining publishers:', error);
        res.status(500).json({
            error: 'An error occurred while getting the publishers',
        });
    }
};

const getPublisherByName = async (req, res) => {
    try {
        const { name } = req.query;
        const publisher = await Publisher.findOne({ name });
        res.json({ publisher });
    } catch (error) {
        console.error('Error retrieving publisher by name:', error);
        res.status(500).json({
            error: 'An error occurred when retrieving the publisher by name',
        });
    }
};

const updatePublisher = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            correspondenceAddress,
            phone,
            email,
            maxBooksRegistered,
        } = req.body;

        const updatedPublisher = await Publisher.findByIdAndUpdate(
            id,
            {
                name,
                correspondenceAddress,
                phone,
                email,
                maxBooksRegistered,
            },
            { new: true },
        );

        res.json({ publisher: updatedPublisher });
    } catch (error) {
        console.error('Error updating the publisher:', error);
        res.status(500).json({
            error: 'An error occurred while updating the publisher',
        });
    }
};

const deletePublisher = async (req, res) => {
    try {
        const { id } = req.params;
        await Publisher.findByIdAndRemove(id);
        res.json({ message: 'Publisher successfully removed' });
    } catch (error) {
        console.error('Error deleting publisher:', error);
        res.status(500).json({
            error: 'An error occurred while deleting the publisher',
        });
    }
};

module.exports = {
    createPublisher,
    getAllPublishers,
    getPublisherByName,
    updatePublisher,
    deletePublisher,
};
