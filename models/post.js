/* import mongoose */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Define Post schema */
const postSchema = new Schema({

	item_name: { type:String,	required:true },

	item_type: { type:String, default:'Purchased food' },

	place_name: { type:String, required:true },

	location: { type:String },

	cuisine: {  type:String, required:true },

	review: String,

	media: [String],

	price: { type:String, required:true, min:0 },

	rating: { type:Number, required:true, min:1, max:5 },

	hashtags: [String],

	author: { _id: mongoose.ObjectId, name: { type:String, required:true }},

	total_likes: { type:Number, default:0 },

	isDeleted: { type:Boolean, default:'false' }

}, {timestamps:true});

/*Define Post model */
const Post=mongoose.model('Post',postSchema);

/* export the Post model */
module.exports = Post;