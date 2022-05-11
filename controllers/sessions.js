const express = require('express');

const bcrypt = require ('bcrypt');

const sessionsRouter = express.Router();

const User = require('../models/user.js');

//New (login page)

sessionsRouter.post('/', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (error, foundUser) =>{
        if (!foundUser){
            res.send('User not found... try again.')
        } else{
            const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password)

            if(passwordMatches){
                req.session.currentUser = foundUser;

                res.redirect('/')
            } else{
                res.send('Invalid login!')
            }
        }
    })
})

//delete (logout route);

sessionsRouter.delete('/', (req, res) =>{
    req.session.destroy((error) =>{
        res.redirect('/')
    })
})

//create (login route)




module.exports = sessionsRouter;