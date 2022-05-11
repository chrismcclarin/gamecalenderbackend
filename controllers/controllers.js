const express = require ('express');
const controllerRouter = express.Router();



//index

controllerRouter.get('/', async (req, res) =>{
    res.send('This is the main page')
});



module.exports = controllerRouter;