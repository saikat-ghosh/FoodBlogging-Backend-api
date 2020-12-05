/* import Express */
const express = require('express');

/* import Models */
const User = require('../models/user');

/* import third-party modules */
const bcrypt = require('bcrypt');

/* create a new Router instance */
const router = express.Router();

//GET method handler to display all users to admin
router.get("/",async (req,res)=>{
	try
	{	//get all users
		var users = await User.find({});
		res.json({ users:users,error:null });
	}
	catch(err){		//else throw error
		throw err;
	}
});

//POST method handler to register new user
router.post('/',async (req,res)=>{ 
	try{
		//check if email already registered
		var user = await User.findOne({email:req.body.email});
		if(user)	//if email exists, send errorMessage
			return res.status(400).send('Email already registered! Try another Email.');

		//else create a new User object with form values passed by user	
		user = new User(req.body);
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password,salt);

		//save new user to the database
		await user.save();
		const token = user.createJWTtoken(); //generate JWT token for direct log in
		res.header('x-auth-token',token).send('User successfully registered.');
		}
	catch(err){		//else throw error
		throw err;
	}
});

//POST method handler to logging in user to their account
router.post("/auth",async (req,res)=>{
	try
	{	//get user with given email & password
		var user = await User.findOne({ email: req.body.email });
		if(!user) //if no user found with given email id, return errorMessage
			return res.status(400).send('Email Not Registered!');
		//check if password if correct
		var validPassword = await bcrypt.compare(req.body.password,user.password);
		if(!validPassword) //if passwords do not match, return errorMessage
			return res.status(400).send('Incorrect Password!');
		//else user authenticated successfully, return JWT token
		const token = user.createJWTtoken();
		res.send(token);
	}
	catch(err){		//else throw error
		throw err;
	}
});

//GET method handler for finding particular user by passing user_id
router.get("/:id",(req,res)=>{
	User.findById(req.params.id)
		.then((data)=>{			//if query success, return json data
			if(!data)			//comment this line after testing
				data='No user found with given ID'; //null data checking should be handled in frontend
			res.json({ user:data,error:null });
		})
		.catch((err)=>{			//else return custom error message
			res.json({ user:null,error:err });
		});

});

/* export the User Router */
module.exports = router;

//set food_blogging_JWTSecretKey=skt