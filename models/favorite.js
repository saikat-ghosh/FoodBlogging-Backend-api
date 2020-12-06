/* import mongoose */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Define Favorite schema */
const favoriteSchema = new Schema({

	user: {  _id: mongoose.ObjectId, name: { type:String, required:true }},

	post: {  _id: mongoose.ObjectId,
			 item_name: { type:String, required:true },
			 place_name: { type:String, required:true },
			 cuisine: {  type:String, required:true, lowercase:true },
			 media: [String],
			} 
}, {timestamps:true});

/*Define Favorite model */
const Favorite = mongoose.model('Favorite',favoriteSchema);

/* export the Post model */
module.exports = Favorite;