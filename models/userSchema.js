const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: String,
}, { timestamps: true });

const User = mongoose.model('users', userSchema);

module.exports = User