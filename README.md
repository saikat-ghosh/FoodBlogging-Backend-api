/*-----------------------------------------------------------------------------------------*/
/*---------------------	Food Blogging Project - ReadMe File -------------------------------*/
/*-----------------------------------------------------------------------------------------*/
/*--- Repository URL: https://github.com/saikat-ghosh/FoodBlogging-Backend-api.git --------*/
/*-----------------------------------------------------------------------------------------*/
/*------------------------------- Instructions to run : -----------------------------------*/
/* 1.	Clone repository from above URL													   */
/* 2.	Go to cloned folder and run the command "npm install"							   */
/* 3.	Install nodemon package globally and run command "nodemon" from folder root	       */
/*-----------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------*/
/*-------------------------- First Commit ----- 12/11/2020 --------------------------------*/
/* 										Saikat G 										   */
/*-----------------------------------------------------------------------------------------*/
/* 1. Post api added : GET/POST/UPDATE/DELETE routes added -> test it using Postman -> URL: http://localhost:3000/api/posts?page=1
/*    Use below sample data for POST query -> select RAW option and change TEXT  to JSON
/*    {
		"item_name":"maggi",
		"item_type":"purchased food",
		"place_name":"R-Mart",
		"location": "Nandan Park,Kolkata",
		"cuisine":"",
		"review":"cheap price!!!.",
		"rating":"5",
		"price":"20",
		"hashtags":"'instantnoodles','cheapPrice'"
	  }
/*
/* 2. Pagination logic added -> currently showing 2 posts per page -> can be altered by setting the variable postPerPage (PostRoutes.js file, line:14)
/*    Expectation from Frontend: hit GET Posts URL like '/api/posts?page=2' -> pass '?page=value' as query parameter; default is 'page=1' if not passed
/*    --------------------------
/* 3. AddCuisine logic added -> while adding new post, if cuisine passed already exists, skip it, else add it as new cuisine item in collection
/*    Expectation from Frontend: show all existing cuisines in 'Add Post' form to choose from, also give an option to add new cuisine, else pass 'defualt' as default value
/*    --------------------------
/*
/*	  JSON Data format to be sent from backend : General Syntax-> { posts:data,error:null }
/*    -----------------------------------------
/*	  		Route URL	| Method | 		  Functionality 	   | 	Data Format from backend	    | Comment
/*    --------------------------------------------------------------------------------------------------------------------
/*	  /api/posts 		| 	GET	 | Fetch all posts in homepage |  { posts:data,error:err }  		| Each response is a JSON object with
/*	  /api/posts/create	|   GET  | Open form to add new post   |  { allCuisines:data,error:null }	| key-value pair. In frontend, check
/*	  /api/posts 		|   POST | Submit form to add new post |  { posts:data,error:err } 			| for each key & check if it is null
/*	  /api/posts/{id}	| 	GET  | Display particular post 	   | 		,,							| or has value. Display appropriate
/*	  /api/posts/{id}	| 	PUT  | Submit form to update post  |  		,,							| message accordingly. For ex: Raise
/*	  /api/posts/{id}	| DELETE | Delete specific post 	   | 		,,							| alert if (error) or if (!posts)
/*
/*	  /api/cuisines 	| 	GET	 | Get all cuisine in homepage |  { data:[],error:err }  			| This is the cuisine route for 
/*	  /api/cuisines 	| 	POST | Add new cuisine to Database |  { data:[],error:err }  			| dislaying or adding new cuisines
/*
/*	  /api/users	 	| 	GET	 | show all users to ADMIN	   |  { users:users,error:null }		| This is for ADMIN to see all users 
/*	  /api/users	 	| 	POST | sign up new user 		   |  JWT token in response header		| fill name,email,passwd(8 char min), role(default 'USER')
/*															   |    errorMessage if unsuccessful	|
/*	  /api/users/auth	|   POST | login user to application   |  JWT token if login success		| provide email,passwd
/*															   |    errorMessage if unsuccessful	|
/*	  /api/favorites 	| 	GET	 | show all favorites of user  |  favorites array					| This is user-specific route; shows favorites of current user only
/*	  /api/favorites/{postId} | POST |add item to favorites	   |  response message 				    | no need to pass parms in body, only pass postId as route parm
/*
/* 4. Authentication module added -> signup with name, email(unique), password and get a JWT token in response header; login with email & passwd and receive JWT token
/*    after successful authentication;
/*
/* 5. User favorite module added -> when a user likes a post, the post automatically gets added to the user's favorites list; also the like count of the post increases
/*