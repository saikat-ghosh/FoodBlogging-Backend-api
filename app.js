/* import third-party libraries */
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

/* import Models */
const Post = require('./models/post');
const Cuisine = require('./models/cuisine');

/* import Middlewares */
const auth = require('./middlewares/auth');

/* import Routes */
const postRoutes = require('./routes/postRoutes');
const cuisineRoutes = require('./routes/cuisineRoutes');
const userRoutes = require('./routes/userRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

/* use below MongoDB Atlas connection string to connect to Cloud Database */
const dbURI='mongodb+srv://testuser:testuser@skt.wbcfc.mongodb.net/foodblog?retryWrites=true&w=majority'

/*------------ create the Express app instance ------------*/
const app=express();
/*---------------------------------------------------------*/

/* connect to Atlas Database */
mongoose.connect(dbURI, { useNewUrlParser: true,useUnifiedTopology:true})
	.then((success)=>{ 
		console.log('Successfully connected to Atlas MongoDB...');
		/* start the app server on port 3000 */
		app.listen(3000);
		console.log('listening requests on Port 3000');
	})
	.catch((err)=>{ console.log('Error in connecting Atlas MongoDB...'+ err)});

/* make the public folder accessible to contain external files */
app.use(express.static('public'));
app.use(cors());

/* pass form data to the request object */
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

/* log details for each incoming request using 3rd party package 'Morgan' */
app.use(morgan('dev'));

/* introduce Route middlewares to handle route requests */
app.use("/api/users",userRoutes);

//below routes needs authentication first
app.use(auth);
app.use("/api/posts",postRoutes);
app.use("/api/cuisines",cuisineRoutes);					//added for testing purpose, might not be required later
app.use("/api/favorites",favoriteRoutes);

/* index route -> redirects to posts for now, later will return the login/signup page */
app.get("/",(req,res)=>{
	res.redirect("api/posts");
});

/* default request handler for invalid routes/url */
app.use((req,res)=>{
	res.status(404).send('404 - Page Not Found');
});