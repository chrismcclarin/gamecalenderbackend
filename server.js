//DEPENDENCIES
// var parseString = require('xml2js').parseString;
const express = require ('express');
const cors = require ('cors');
const morgan = require ('morgan')
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");

// EXPRESS APP
const app = express();

// SERVER SETTINGS
require('dotenv').config();

// EXPOSE CONFIG VARIABLES
const { MONGODB_URL, PORT = 4000 } = process.env;

//MONGODB connection
mongoose.connect(MONGODB_URL);

//MONGODB EVENT LISTENERS

const db = mongoose.connection;
db
.on('connected', () => console.log('Connected to MongoDB'))
.on('disconnected', () => console.log('Disconnected from MongoDB'))
.on('error', (err) => console.log('MongoDB Error: ' + err.message))

//Middleware

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes 

const routesController = require ('./controllers/controllers');
const getBGRoute = require ('./controllers/getBG');
const createBGRoute = require ('./controllers/createBG');
const updateBGRoute = require ('./controllers/updateBG');
const deleteBGRoute = require ('./controllers/deleteBG');


// organizers
const sortBGorg = require ('./organizers/sortedBG');
const mostcountBGorg = require ('./organizers/mosttoleastcountBG');
const winnerorg = require ('./organizers/winner');
const playerorg = require ('./organizers/player');
const pickedorg = require ('./organizers/picked');
const themelistorg = require ('./organizers/themelist');
const playerlistorg = require ('./organizers/playerlist');



// Build

app.use('/', routesController);
app.use('/bg', getBGRoute);
app.use('/bg', createBGRoute);
app.use('/bg/:id', updateBGRoute);
app.use('/bg/:id', deleteBGRoute);


app.use('/bg/sort/', sortBGorg);
app.use('/bg/mostcount/', mostcountBGorg);
app.use('/bg/winner/', winnerorg);
app.use('/bg/player/', playerorg);
app.use('/bg/picked/', pickedorg);
app.use('/bg/themelist/', themelistorg);
app.use('/bg/playerlist/', playerlistorg);

//listen for PORT

app.listen(PORT, () => console.log(`Listening on ${PORT}`))








//Possible way to grab data from BGG.com, but currently ineffectual
// app.get('/xml', async (req, res) => {
//     console.log(req.body)
//     return fetch('https://api.geekdo.com/xmlapi/search?search=wingspan')
//         .then(response => response.text())
//         .then(str => parseString(str, function (err, result) {
//             // console.log(result.boardgames.boardgame[0].name[0]._)
//             return res.json(result);

//         }))
// });








