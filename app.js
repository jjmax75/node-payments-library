'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');

require('dotenv').config();
const port = process.env.PORT || 3000;
const path = process.cwd();

mongoose.connect(process.env.MONGO_URI);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/css', express.static(path + '/static/css'));
app.use('/js', express.static(path + '/static/js'));

app.set('view-engine', 'ejs');

app.use(session({
  secret: 'thisisasecret',
  cookie: {},
  resave: true,
  saveUninitialized: false
}));
app.use(flash());

require(path + '/routes/index.js')(app);

app.listen(port, function() {
  console.log('Payment Gateway app listening on port ' + port + '......');
});
