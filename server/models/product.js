const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	
	prodID: {
		type: Number,
		trim: true,
		unique: true
	},

	title: {
		type: String,
		trim: true,
		required: [true, 'Title is required'],
		maxlength: [150, 'Max length 150 characters']
	},
	highlights: {
		type: String,
		trim: true,
		maxlength: [25, 'Max length 25 characters']
	},
	description: {
		type: String,
		trim: true,
		required: [true, 'Description is required'],
		maxlength: [300, 'Max length 300 characters']
	},

	price: {
		type: Number,
		trim: true,
		required: [true, 'Price is required'],
		min: 1
	},

	location: {
		type: String,
		trim: true,
		required: [true, 'Location is required']
	},

	image: {
		type: String,
		trim: true,
		required: [true, 'Image is required']
	}

},{ timestamps: true });

mongoose.model('Product', ProductSchema);