//DEPENDENCIES

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
    Player1: String,
    Player2: String,
    Player3: String,
    Player4: String,
    Player5: String,
    Player6: String,
    Winner: String,
    url: String,
    Date: Date
}, { timestamps: true });

const bg = mongoose.model('BG', BGSchema);



//Middleware

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Routes 

const routesController = require ('./controllers/controllers.js');

app.use('/', routesController);


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












