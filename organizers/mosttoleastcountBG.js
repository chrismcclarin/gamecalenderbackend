const express = require ('express');
const BG = express.Router();
const bg = require('../models/bgSchema')

BG.get('/:id', async (req, res) => {
    const cursor = await bg.aggregate([
    { $group : { "_id": "$Name", "count": { $sum: 1 } } },
    { $sort: {"count" : Number(req.params.id), "_id":1 } },
], {collation: {locale:"en"}})
res.send(cursor)
});

module.exports = BG;