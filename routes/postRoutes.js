/* import Express */
const express = require('express');

/* import Models */
const Post = require('../models/post');
const Cuisine = require('../models/cuisine');

/* import Middlewares */
const authorize = require('../middlewares/ownerOrAdmin');

/* create a new Router instance */
const router = express.Router();

/* attach route handlers to the Router instance */
//GET method handler to display all posts on home page
router.get("/",(req,res)=>{

	Post.find({ 'isDeleted' : false })
		.sort('-createdAt')	 	//sort by creation time, latest on top
		.then((data)=>{			//if query success, return json data
			res.json({ posts:data,error:null });
		})
		.catch((err)=>{			//else return custom error message
			res.json({ posts:null,error:err });
		});
});

//POST method handler to add new post
router.post("/",(req,res)=>{
	//create a new Post object with form values passed by user
	const post = new Post(req.body);
	post.author._id = req.user._id;				//attach author_id & author_name from the Request object
	post.author.name = req.user.name;
	//save new post object into the Database
	post.save()
		.then((data)=>{			//if query success, check cuisine existence, then return json data
			//call function to check if cuisine already exists; if no, then add cuisine
			//checkCuisine(req.body.cuisine ? req.body.cuisine : 'default');	//pass default value if cuisine not passed from frontend
			res.json({ posts:data,error:null });
		})
		.catch((err)=>{			//else return custom error message
			res.status(400).json({ posts:null,error:err });
		});
});

//Create Route handler for displaying the 'Add Post' form with all cuisines
router.get("/create",(req,res)=>{
	const allCuisines=Cuisine.find({})
							 .select('cuisine_name')
							 .sort('cuisine_name')
							 .then((data)=>{
							 	res.json({allCuisines:data,error:null});
							 })
							 .catch((err)=>{
							 	res.json({error:err});
							 });
});

//GET method handler for finding particular post by passing post_id
router.get("/:id",(req,res)=>{
	Post.findById(req.params.id)
		.then((data)=>{			//if query success, return json data
			if(!data)			//comment this line after testing
				data='No post found with given ID'; //null data checking should be handled in frontend
			res.json({ posts:data,error:null });
		})
		.catch((err)=>{			//else return custom error message
			res.json({ posts:null,error:err });
		});;

});
//Put method handler for updating a particular post by passing post_id
router.put("/:id",authorize,(req,res)=>{
	Post.findByIdAndUpdate(req.params.id,req.body, {new:true})
		.then((data)=>{			//if query success, check cuisine existence, then return json data
			//call function to check if cuisine already exists; if no, then add cuisine
			//checkCuisine(req.body.cuisine ? req.body.cuisine : 'default');	//pass default value if cuisine not passed from frontend
			res.json({ posts:data,error:null });
		})
		.catch((err)=>{			//else return custom error message
			res.json({ posts:null,error:err });
		});
});
//Delete method handler for deleting a particular post by passing post_id
router.delete("/:id",authorize,async (req,res)=>{ 
	try{
		//retrieve post from Database
		var post = await Post.findById(req.params.id);
		//if post not found, return response
		if(!post)
			return res.status(400).send('No such post found.');
		//else turn the softDelete flag up for the post
		post.isDeleted = true;
		await post.save();		 //save the post
		res.send('Post deleted.');
	}
	catch(err){					 //else throw error
		throw err;
	}
});

//custom function to check cuisine existence, recieves cuisine name either default or passed from frontend
function checkCuisine(itemCuisine){
	Cuisine.findOne({cuisine_name:itemCuisine})		//find cuisine from collection by cuisine name
		   .then((cuisine)=>{
			    if(!cuisine){						//if cuisine does not exist already
			       	cuisine=new Cuisine({cuisine_name:itemCuisine});	//craete new cuisine instance
			       	cuisine.save()					//save new cuisine instance
			       			.then((result)=>{
			       				console.log('new cuisine ' + cuisine.cuisine_name + ' added');
			       				});
			     }else								//cuisine already exists
			     	console.log('cuisine ' + cuisine.cuisine_name + ' already exists');
			})
		   .catch((err)=>{			//else return custom error message
			res.json({ posts:null,error:err });
			});

}
/* export the Post Router */
module.exports = router;

/*
{
		"item_name":"noodles",
		"item_type":"purchased food",
		"place_name":"R-Mart",
		"location": "Nandan Park,Kolkata",
		"cuisine":"",
		"review":"cheap price!!!.",
		"rating":"5",
		"price":"20",
		"hashtags":"['instantnoodles','cheapPrice']"
} */
