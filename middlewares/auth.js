/* import Models */
const User = require('../models/user');

/* import third-party modules */
const jwt = require('jsonwebtoken');

async function authenticate(req,res,next){
	const token = req.header('x-auth-token');
	if(!token)																			//no token found
		return res.status(401).send('No Authentication token found');
	try {
		const payload = jwt.verify(token,'dummykey');									//verify token
		req.user = await User.findById(payload._id).select(['name','isAdmin']);			//find the user by token.id and attach to the requset object
		next();
	}catch(err){
		console.log(err);
		res.status(400).send('Invalid Authentication token');
	}
}

module.exports = authenticate;