const express = require ('express');
const BG = express.Router();
const bg = require('../models/bgSchema')

BG.get('/', async (req, res) => {
    const cursor = await bg.aggregate([
    { $group : { "_id": "$Name",} },
    { $sort: { "_id":1 } },
], {collation: {locale:"en"}})
res.send(cursor)
});

module.exports = BG;