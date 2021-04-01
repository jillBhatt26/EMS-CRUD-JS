// Requires
// --------------------------------------------

// Require Express
const express = require('express');

// Require mongoose
const mongoose = require('mongoose');

// require the app router
const empRouter = require('./routes/EmployeeRoutes');

// require cors
const cors = require('cors');

// dotenv
const dotenv = require('dotenv');

// SETUP and CONFIG
// --------------------------------------------

// dotenv configuration
dotenv.config();

// init express
const app = express();

// use cors to allow and serve requests from other applications
app.use(cors());

// URL Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// define dsn URI
const dbURI = `mongodb+srv://jillbhatt:${process.env.ATLAS_PASSWORD}@practice.tdza6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// connect to the db on URI
mongoose
    .connect(dbURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => {
        // LISTEN
        // --------------------------------------------

        // listen to app
        const PORT = process.env.PORT || 5000;
        const HOST = process.env.HOST || 'localhost';

        app.listen(PORT, HOST, err => {
            if (err) throw err;
            else console.log(`app running on ${HOST}:${PORT}`);
        });
    })
    .catch(err => console.log(err));

// Middleware
app.use('/', empRouter);
