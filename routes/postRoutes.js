/* import Express */
const express = require('express');

/* import Models */
const Post = require('../models/post');
const Cuisine = require('../models/cuisine');

/* create a new Router instance */
const router = express.Router();

/* attach route handlers to the Router instance */
//Get method handler to display all posts on home page
router.get("/",(req,res)=>{
	var postPerPage = 2;							//sets the number of post displayed per page
													//sets the pageNumber; default is '1' if not passed from frontend
	var pageNumber=req.query.page>0 ? req.query.page : 1;
	Post.find({})									//get all posts
		.skip((pageNumber - 1) * postPerPage) 		//skip posts displayed on previous pages ---\ pagination
		.limit(postPerPage)  						//show next 10 posts on the current page ---/   logic
		.sort('-createdAt')	 						//sort by creation time, latest on top
		.then((data)=>{			//if query success, return json data
			res.json({ posts:data,error:null });
		})
		.catch((err)=>{			//else return custom error message
			res.json({ posts:null,error:err });
		});
});

//Post method handler to add new post
router.post("/",(req,res)=>{
	//create a new Post object with form values passed by user
	const post = new Post(req.body);
	//save new post object into the Database
	post.save()
		.then((data)=>{			//if query success, check cuisine existence, then return json data
			//call function to check if cuisine already exists; if no, then add cuisine
			checkCuisine(req.body.cuisine ? req.body.cuisine : 'default');	//pass default value if cuisine not passed from frontend
			res.json({ posts:data,error:null });
		})
		.catch((err)=>{			//else return custom error message
			res.json({ posts:null,error:err });
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

//Get method handler for finding particular post by passing post_id
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
router.put("/:id",(req,res)=>{
	Post.findByIdAndUpdate(req.params.id,req.body, {new:true})
		.then((data)=>{			//if query success, check cuisine existence, then return json data
			//call function to check if cuisine already exists; if no, then add cuisine
			checkCuisine(req.body.cuisine ? req.body.cuisine : 'default');	//pass default value if cuisine not passed from frontend
			res.json({ posts:data,error:null });
		})
		.catch((err)=>{			//else return custom error message
			res.json({ posts:null,error:err });
		});
});
//Delete method handler for deleting a particular post by passing post_id
router.delete("/:id",(req,res)=>{
	Post.findByIdAndDelete(req.params.id)
		.then((data)=>{			//if query success, return json data
			res.json({ posts:data,error:null });
		})
		.catch((err)=>{			//else return custom error message
			res.json({ posts:null,error:err });
		});

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