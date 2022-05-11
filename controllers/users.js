const bcrypt = require('bcrypt');

const express = require('express');

const userRouter = express.Router();

const User = require ('../models/user.js');

//new (registration page)

//create (registration route)

userRouter.post('/', (req, res) =>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    
    User.create(req.body, (error, createdUser) =>{
        res.redirect('/')
    });
});

module.exports = userRouter;