// // server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// // initialize our express app
// const gmaps = require('./routes/gmaps.route'); // Imports routes for the products
// const server = express();

// // Set up mongoose connection
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://ckim:Gbcv8tM@cluster0-wyddg.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("uottawa").collection("list");
//   // perform actions on the collection object
//   client.close();
// });
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({extended: false}));
// server.use('/places', gmaps);

// let port = 8081;

// server.listen(port, process.env.IP,() => {
//     console.log('Server is up and running on port number ' + port);
// });

const express = require('express');
const mongoose = require('mongoose');
const gmaps = require('./routes/gmaps.route.js');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json()); // Make sure it comes back as json


// Set up mongoose connection
// let dev_db_url = 'mongodb://gg:qwerty1234@ds033767.mlab.com:33767/scrappyio';
// let mongoDB = process.env.MONGODB_URI || dev_db_url;
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const PLACEAPIKEY = 'AIzaSyCsLXMvE-V_AnumPa6sEHFpW5Q8JhNrDDQ';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/places', gmaps);

app.listen(8081, () => { console.log('Server is running...') });