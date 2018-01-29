const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');



mongoose.connect('mongodb://localhost/market');

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', ()=>{
	console.log('connected to mongodb://localhost/market')
});

const models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach((file)=>{
	if(file.indexOf('js')>=0){
		require(models_path + '/' + file);
	}
});