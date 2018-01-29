const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({

	firstname: {
		type: String,
		trim: true,
		required: [true, 'First name is required'],
		maxlength: 24
	},
	lastname: {
		type: String,
		trim: true,
		required: [true, 'Last name is required'],
		maxlength: 24
	},
	email: {
		type: String,
		trim: true,
		required: [true, 'Email is required']
	},

	password: {
		type: String,
		trim: true,
		required: [true, 'Password is required'],
		minlength: [8, 'Min length 8 characters']
	},

	agent: {
		type: String,
		trim: true
	},
	// address: {
	// 	street: {
	// 		type: String,
	// 		trim: true,
	// 		required: [true, 'Street is required'],
	// 		maxlength: [100, 'Max length 100 characters']
	// 	},
	// 	unit: {
	// 		type: String,
	// 		trim: true
	// 	},
	// 	city: {
	// 		type: String,
	// 		trim: true,
	// 		required: [true, 'City is required']
	// 	},
	// 	state: {
	// 		type: String,
	// 		trim: true,
	// 		required: [true, 'State is required']
	// 	},
	// 	zip: {
	// 		type: Number,
	// 		trim: true,
	// 		required: [true, 'Zip code is required']
	// 	},

	// },
	phone: {
		type: String,
		trim: true
	},
	gender: {
		type: String,
		trim: true,
		uppercase: true,
	},
	// birthdate: {
	// 	type: Date,
	// 	trim: true
	// },
	products: [{
		type: Schema.Types.ObjectId,
		ref: 'Product'
	}]
},{ timestamps: true });

mongoose.model('User', UserSchema);