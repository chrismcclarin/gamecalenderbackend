//DEPENDENCIES
var parseString = require('xml2js').parseString;
const express = require ('express');

const cors = require ('cors');

const morgan = require ('morgan')
const mongoose = require('mongoose');

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

// SET UP CREATE UNIT MODEL
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
    startDate: String,
    Length: Number,
}, { timestamps: true });

const bg = mongoose.model('bg', BGSchema);

//Middleware

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Routes 

const routesController = require ('./controllers/controllers.js');

app.use('/', routesController);

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


// INDEX ROUTE
app.get('/bg', async (req, res) => {
    try {

        // SEND ALL
        res.json(await bg.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});


// CREATE ROUTE
app.post('/bg', async (req, res) => {
    try {
        res.json(await bg.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

// UPDATE ROUTE
app.put('/bg/:id', async (req, res) => {
    try {
        res.json(await bg.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    } catch (error) {
        res.status(400).json(error);
    }
});

// DELETE ROUTE
app.delete('/bg/:id', async (req, res) => {
    try {
        res.json(await bg.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});


//listen for PORT

app.listen(PORT, () => console.log(`Listening on ${PORT}`))










