/* import mongoose */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Define Post schema */
const postSchema = new Schema({

	item_name: { type:[String],	required:true },

	item_type: { type:String, required:true },

	place_name: { type:String, required:true },

	location: { type:String, required:true },

	cuisine: {  type:[String], required:true },

	review: String,

	media: [String],

	price: { type:[String], required:true },

	rating: { type:[String], required:true },

	hashtags: [String]

}, {timestamps:true});

/*Define Post model */
const Post=mongoose.model('Post',postSchema);

/* export the Post model */
module.exports = Post;