/* import Express */
const express = require('express');

/* import Models */
const Cuisine = require('../models/cuisine');

/* create a new Router instance */
const router = express.Router();

/* attach route handlers to the Router instance */
//GET method handler to display all posts on home page
router.get("/",(req,res)=>{
	Cuisine.find({})			//get all cuisines
		.select('name')
		.then((data)=>{			//if query success, return json data
			res.json({ data:data,error:null });
		})
		.catch((err)=>{			//else return custom error message
			res.json({ data:null,err:err });
		});
});

//POST method handler to add new post
router.post("/",(req,res)=>{
	//create a new Cuisine object with form values passed by user
	const cuisine = new Cuisine(req.body);
	//save new cuisine object into the Database
	cuisine.save()
		.then((data)=>{			//if query success, return json data
			res.json({ data:data,error:null });
		})
		.catch((err)=>{			//else return custom error message
			res.json({ data:null,err:err });
		});
});

module.exports= router;