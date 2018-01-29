const users = require('../controllers/users.controller');
const products = require('../controllers/products.controller');
const path = require('path');

module.exports=(app)=>{
	// users
	app.post('/users/register', users.register);
	app.post('/users/login', users.login);
	app.get('/users/logout', users.logout);
	app.get('/users/current', users.session);
	app.post('/users/contact', users.contact);

	// products
	app.get('/products/index', products.index);
	app.post('/products/create', products.create);
	app.get('/products/userproducts', products.productsByUser);
	app.post('/products/update', products.update);
	// used app.put instead of app.delete before
	app.post('/products/delete', products.destroy);
	app.get('/products/featured', products.random);
	app.post('/products/search', products.filter);
	// getting product info by product created by user
	app.post('/products/info', products.info);

	app.all('*', (req,res,next)=>{
		res.sendFile(path.resolve('./public/dist/index.html'))
	});
}