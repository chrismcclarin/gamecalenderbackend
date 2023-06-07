const mongoose = require('mongoose');

const BGSchema = new mongoose.Schema({
    Name: String,
    Players: [
        {
            Player: String,
            Winner: Boolean,
            New: Boolean,
            Score: Number,
            Faction: String,
            Picked: Boolean
        },
        {
            Player: String,
            Winner: Boolean,
            New: Boolean,
            Score: Number,
            Faction: String,
            Picked: Boolean
        },
        {
            Player: String,
            Winner: Boolean,
            New: Boolean,
            Score: Number,
            Faction: String,
            Picked: Boolean
        },
        {
            Player: String,
            Winner: Boolean,
            New: Boolean,
            Score: Number,
            Faction: String,
            Picked: Boolean
        },
        {
            Player: String,
            Winner: Boolean,
            New: Boolean,
            Score: Number,
            Faction: String,
            Picked: Boolean
        },
        {
            Player: String,
            Winner: Boolean,
            New: Boolean,
            Score: Number,
            Faction: String,
            Picked: Boolean
        },
    ],
    Groupwin: Boolean,
    GameComments: String,
    url: String,
    theme: String,
    startDate: Date,
    Length: Number,
}, { timestamps: true });

const bg = mongoose.model('boardgametests', BGSchema);

module.exports = bg