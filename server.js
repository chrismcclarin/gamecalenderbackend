//DEPENDENCIES

const express = require ('express');

const cors = require ('cors');

const morgan = require ('morgan')
const mongoose = require('mongoose');
const session = require('express-session');

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
const unitsSchema = new mongoose.Schema({
    Name: String,
    Movement: String,
    WeaponSkill: String,
    BallisticSkill: String,
    Strength: String,
    Toughness: String,
    Wounds: String,
    Attacks: String,
    Leadership: String,
    Save: String,
}, { timestamps: true });

const Units = mongoose.model('Units', unitsSchema);


// IMPORT JSON FILES
const Abilities = require('./CSV/Abilities.json');
const Datasheets_abilities = require('./CSV/Datasheets_abilities.json');
const Datasheets_damage = require('./CSV/Datasheets_damage.json');
const Datasheets_keywords = require('./CSV/Datasheets_keywords.json');
const Datasheets_models = require('./CSV/Datasheets_models.json');
const Datasheets = require('./CSV/Datasheets');
const Factions = require('./CSV/Factions');




//Middleware

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)

//Routes 

const routesController = require ('./controllers/controllers.js');

const userController = require ('./controllers/users');

const sessionsController = require('./controllers/sessions');

app.use('/', routesController);

app.use('/users', userController);

app.use('/sessions', sessionsController);


// ROUTE FOR RETRIEVING ABILITIES INFO
app.get('/Abilities', (req, res) => {
    res.json(Abilities);
});

// ROUTE FOR RETRIEVING DATASHEETS_ABILITIES
app.get('/DatasheetsAbilities', (req, res) => {
    res.json(Datasheets_abilities);
});

// ROUTE FOR RETRIEVING DATASHEETS_DAMAGE
app.get('/DatasheetsDamage', (req, res) => {
    res.json(Datasheets_damage);
});

// ROUTE FOR RETRIEVING DATASHEETS_KEYWORDS
app.get('/DatasheetsKeywords', (req, res) => {
    res.json(Datasheets_keywords);
});

// ROUTE FOR RETRIEVING DATASHEETS_MODELS
app.get('/DatasheetsModels', (req, res) => {
    res.json(Datasheets_models);
});

// ROUTE FOR RETRIEVING DATASHEETS
app.get('/Datasheets', (req, res) => {
    res.json(Datasheets);
});

// ROUTE FOR RETRIEVING FACTIONS
app.get('/Factions', (req, res) => {
    res.json(Factions);
});


// UNITS INDEX ROUTE
app.get('/units', async (req, res) => {
    try {
        // SEND ALL UNITS
        res.json(await Units.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});


// UNITS CREATE ROUTE
app.post('/units', async (req, res) => {
    try {
        res.json(await Units.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

// UNITS UPDATE ROUTE
app.put('/units/:id', async (req, res) => {
    try {
        res.json(await Units.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    } catch (error) {
        res.status(400).json(error);
    }
});

// UNITS DELETE ROUTE
app.delete('/units/:id', async (req, res) => {
    try {
        res.json(await Units.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});


//listen for PORT

app.listen(PORT, () => console.log(`Listening on ${PORT}`))












