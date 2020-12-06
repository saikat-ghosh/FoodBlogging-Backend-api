/* import Express */
const express = require('express');

/* import Models */
const User = require('../models/user');
const Post = require('../models/post');
const Favorite = require('../models/favorite');

/* import third-party modules */

/* create a new Router instance */
const router = express.Router();

//GET method handler to display all favorites of the current user
router.get("/",async (req,res)=>{
	try
	{	//get all favorite items
		console.log(req.user.name);
		var favorites = await Favorite.find({ 'user._id': req.user._id }).populate('post').select(['post','-_id']);
		res.json({ favorites: favorites });
	}
	catch(err){		//else throw error
		throw err;
	}
});

//POST method handler to add favorites
router.post('/:postId',async (req,res)=>{ 
	try{
		//retrieve post from Database
		var post = await Post.findById(req.params.postId);
		//if post not found, return response
		if(!post)
			return res.status(400).send('No such post found.');
		//if post already added to favorites, return response
		var favorite = await Favorite.find({ 'user._id': req.user._id, 'post': post._id });
		if(favorite.length)
			return res.send('Post already added to favorites');
		//else add a new entry to the Favorite collection
		favorite = new Favorite({
			post: post._id,
			user: {
				_id: req.user._id,
				name: req.user.name
			}
		});
		
		//save new favorite object to database
		await favorite.save();
		post.total_likes++;		 //increase the no. of likes for the post
		await post.save();		 //save the post with updated like count
		res.send('Added to favorites');
	}
	catch(err){					 //else throw error
		throw err;
	}
});

/* export the Favorite Router */
module.exports = router;