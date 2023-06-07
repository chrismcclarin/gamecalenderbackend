const express = require ('express');
const createBG = express.Router();
const bg = require('../models/bgSchema')

// CREATE ROUTE
createBG.post('/', async (req, res) => {
    try {
        res.json(await bg.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = createBG;