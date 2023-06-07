const express = require ('express');
const BG = express.Router();
const bg = require('../models/bgSchema')

BG.get('/:name', async (req, res) => {
    try {
        res.json(await bg.find(
            {Players: {$elemMatch: {Player: req.params.name, Picked: true}}}))
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = BG;