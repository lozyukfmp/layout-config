const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config');


mongoose.connect(config.mongoUri)
    .then(_ => console.log('LaPS : Mongo DB Connected'))
    .catch(err => console.log(err));

app.use(passport.initialize());
require('./passport')(passport);

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/resources', express.static('server/resources'));

app.use(express.static('client/dist'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../client', 'dist', 'index.html'))
});

module.exports = app;
