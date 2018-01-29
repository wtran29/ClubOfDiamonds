const mongoose = require('mongoose');
const User = mongoose.model('User');
const express = require('express-session');
const bcrypt = require('bcryptjs');

module.exports = {
	register: (req,res)=>{
		console.log('in controllers/users.controller');
		console.log('checking if user exists before register');
		User.findOne({ email: req.body.email })
		.exec((err,newUser)=>{
			if(err){
				console.log('user already exists!');
				res.json({
					errors: { 
						register: {
								message: 'User already exists'}}
				});
			}
			else{ 
				if(!newUser){
					let newUser = new User(req.body);
					let hashPw = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
					newUser.password = hashPw;
					console.log('registering new user:', newUser);
					newUser.save((err)=>{
						if(err){
							console.log('error saving to models.user: ',err);
							// res.json(err);
						}
						else{
							console.log('creating session id');
							req.session.user_id = newUser._id;
							console.log('successfully registered user', newUser._id);
							console.log('user: ', newUser);
							res.json(newUser);						
						}

					})
				}
			}
		})
		
	},

	login: (req, res)=>{
		console.log('in controllers/users.controller');
		console.log('finding user');
		User.findOne({ email: req.body.email })
		.exec((err,login)=>{
			if(err){
				console.log('user email not found', err);
				res.status(401).json({
					errors: {
						login: {
							message: 'User email not found'}}
				});
			}
			else{
				if(login && bcrypt.compareSync(req.body.password, login.password) == true){
					console.log('passwords match');
					console.log('getting session id');
					req.session.user_id = login._id;
					console.log('logging in: ', login._id);
					res.json(true);
				}
				else{
					console.log('error finding user, displaying error msg');
					res.status(402).json({
						errors: { 
							login: { 
								message: 'Invalid email and password' }}
					});

				}	
			}
			
		})
	},
	session: (req,res)=>{
		console.log('in controllers/users.controller');
		console.log('finding sessionID');
		if(req.session.user_id == undefined){

			res.json({
				errors: {
					session: {
						message: 'You are not logged in'}}
			});
		}
		else{
			User.findById({_id: req.session.user_id}, (err,currentUser)=>{
				if(err){
					console.log('error finding sessionID: ', err);
					res.json(false);
				}
				else {
					console.log('found sessionID: ',currentUser);
					res.json(currentUser);
				}
			})
		}
	},
	logout: (req,res)=>{
		console.log('in controllers/users.controller');
		console.log('logging out');
		req.session.destroy();
		res.json(true);
	},
	// confirm if this code works, if not maybe pass in req.body.id
	contact: (req,res)=>{
		console.log('in controllers/users.controller');
		console.log('getting contact');
		console.log('product_user', req.body.id);
		User.findById(req.body.id)
		.then((user)=>{
				console.log('found contact', user);
				let contact = {};
				contact['createdAt'] = user.createdAt;
				contact['firstname'] = user.firstname;
				contact['lastname'] = user.lastname;
				contact['agent'] = user.agent;
				contact['phone'] = user.phone;
				contact['email'] = user.email;
				res.json(contact);
			});

	}
}