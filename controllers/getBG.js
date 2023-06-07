const express = require ('express');
const getBG = express.Router();
const bg = require('../models/bgSchema')

// INDEX ROUTE
getBG.get('/', async (req, res) => {
    try {
        res.json(await bg.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = getBG;