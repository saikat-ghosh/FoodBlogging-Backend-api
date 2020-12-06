/* import mongoose */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Define Cuisine schema */
const cuisineSchema = new Schema({
	name: { type:String,	required:true,	lowercase:true },
	
}, {timestamps:true});

/* Define Cuisine model */
const Cuisine=mongoose.model('Cuisine', cuisineSchema);

/* export the Cuisine model */
module.exports =  Cuisine;