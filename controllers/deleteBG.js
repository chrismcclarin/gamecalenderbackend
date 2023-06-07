const express = require ('express');
const deleteBG = express.Router();
const bg = require('../models/bgSchema')

// DELETE ROUTE
deleteBG.delete('/', async (req, res) => {
    try {
        res.json(await bg.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = deleteBG;