const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const User = mongoose.model('User');

module.exports = {
	productsByUser: (req,res)=>{
		console.log('in controllers/products.controller');
		console.log('retrieving products created by user');
		Product.find({ _user: req.session.user_id }).sort('-createdAt')
		.exec((err,productsByUser)=>{
			if(err){
				console.log('error getting all products by user: ', err);
				res.json(err);
			}
			else{
				console.log('successfully retrieved products by user');
				res.json(productsByUser);
			}
		})
	},
	index: (req,res)=>{
		console.log('in controllers/products.controller');
		console.log('retrieving all products')
		Product.find({}).sort('-createdAt')
		.exec((err,allProducts)=>{
			if(err){
				console.log('error retrieving all products: ',err);
				res.json(err);
			}
			else{
				console.log('successfully retrieved products');
				res.json(allProducts);
			}
		})
	},
	create: (req,res)=>{
		console.log('in controllers/products.controller');
		console.log('declaring new product');
		let product = new Product(req.body);
		product._user = req.session.user_id;
		console.log('creating new product: ', product);
		product.save((err, product)=>{
			if(err){
				console.log('error saving to models.product: ', err);
				res.json(err);
			}
			// checks if there is a duplicate product id generated, then regenerates
			if(Object.keys(product.prodID).includes(product.prodID)){
				product.prodID = Math.floor(Math.random() * 99999) + 1;
			}
			else{
				console.log('successfully created product');
				res.json(true);
			}
		})
	},
	update: (req,res)=>{
		console.log('in controllers/products.controller');
		console.log('updating product');
		Product.findByIdAndUpdate(req.body._id, req.body, (err)=>{
			if(err){
				console.log('error updating product');
				res.json(err);
			}
			else{
				console.log('successfully updated product');
				res.json(true);
			}
		})
	},
	// remove by specific id related to product
	destroy: (req,res)=>{
		console.log('in controllers/products.controller');
		console.log('deleting product');
		Product.remove(req.body, (err,deleteProduct)=>{
			if(err){
				console.log('error deleting: ', err);
				res.json(err);
			}
			else{
				console.log('successfully deleted product');
				res.json(true);
			}
		})
	},
	random: (req,res)=>{
		console.log('in controllers/products.controller');
		console.log('featuring product of the day');
		Product.find({})
		.then((randomProduct)=>{
			let featured = Math.floor(Math.random()*randomProduct.length);
			res.json(randomProduct[featured]);
		})
		.catch((err)=> console.log(err));
	},
	filter: (req,res)=>{
		console.log('in controllers/products.controller');
		console.log('searching for products');
		Product.find({$or:[
			{ 'title': { '$regex': req.body.filterBy }},
			{ 'description': { '$regex': req.body.filterBy }},
			{ 'highlights': { '$regex': req.body.filterBy }},
			{ 'location': { '$regex': req.body.filterBy }}
		]})
		.then((search)=> res.json(search))
		.catch((err)=> console.log(err));
	},
	// finding product info by product created by user
	info: (req,res)=>{
		console.log('product', req.body);
		Product.findById(req.body)
		.then((product)=>{
			console.log('found related product', product);
			let productInfo = {};
			productInfo['title'] = product.title;
			productInfo['price'] = product.price;
			res.json(productInfo);
		})
	}

}