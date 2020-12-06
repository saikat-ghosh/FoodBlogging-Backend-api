/* import Models */
const User = require('../models/user');
const Post = require('../models/post');

/* import third-party modules */
const jwt = require('jsonwebtoken');

async function hasAuthorization(req,res,next){
	if(!req.params.id)																			//no id found
		return res.status(400).send('No Post id found');
	try {
		const post = await Post.findById(req.params.id);
		//check if the current user is admin or author of the post
		/*if (req.user._id.equals(post.author._id) || req.user.isAdmin)
			console.log('has authorization');
		else
			return res.status(401).send('You are not authorized to perform ths activity!'); */
		next();
	}catch(err){
		res.status(400).send('Something went wrong!');
	}
}

module.exports = hasAuthorization;