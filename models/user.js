/* import third-party modules */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const config = require('config');

/* Define User schema */
const userSchema = new Schema({

	name: { type:String, required:true, pattern:/^a-zA-Z$/ },

	email: { type:String, required:true, unique:true, minlength:3, maxlength:255 },

	password: { type:String, required:true, minlength:8, maxlength:1024 },

	role: { type:String, required:true, default:'user' }

}, {timestamps:true});

/* Define methods under UserSchema */
userSchema.methods.createJWTtoken = function() {
	console.log(config.get('JWTSecretKey'));
	const token = jwt.sign({_id: this._id},'dummykey');
	//comment above line & uncomment below line to use secretkey set by ENV
	//const token = jwt.sign({_id: this._id},config.get('JWTSecretKey'));
	return token;
}

/* Define User model */
const User=mongoose.model('User',userSchema);

/* export the Post model */
module.exports = User;