const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	path = require('path'),
	mongoose = require('mongoose'),
	session = require('express-session'),
	bcrypt = require('bcryptjs');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(session({
	secret: 'shutyourmouth',
	resave: false,
	saveUninitialized: true
}));

app.use(express.static(__dirname + '/public/dist'));

require('./server/config/database');
require('./server/config/routes')(app);

app.listen(8888, ()=>{
	console.log('Listening on port 8888')
});