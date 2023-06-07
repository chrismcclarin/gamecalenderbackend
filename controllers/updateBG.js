const express = require ('express');
const updateBG = express.Router();
const bg = require('../models/bgSchema')

// UPDATE ROUTE
updateBG.put('/', async (req, res) => {
    try {
        res.json(await bg.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = updateBG;