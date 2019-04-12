// Require all Eniveroment variable
require('dotenv').config();

// Require all development packages
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

// Set the port
const PORT = process.env.PORT || 3000;

// Set express
const app = express();

// Set body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set log for all requests to database
app.use(morgan('dev'));

// Require the passport config
require('./config/passport')(passport);

//CORS
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Bring in the route file
const route = require('./routes/route');

// Bundle API routes
app.use('/api', route);

// Start server
app.listen(PORT, console.log(`Api started on http://127.0.0.1:${PORT}/`));