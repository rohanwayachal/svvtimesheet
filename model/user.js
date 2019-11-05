const mongoose = require('mongoose');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema ({

  user: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  }

});


const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = async function(username) {
  const query = {username: username}
  let user=await User.findOne(query);
  console.log(user)
  return user
}

module.exports.addUser = async function(newUser) {
	
	try{
		const query = {user: newUser.user}
		let user=await User.findOne(query);
		console.log(user)
		
		if (user!=null)
			return "User already exist"
		db_resp= await newUser.save();
		return true
		
	}
	
	catch(err)
	{
		console.log(err)
		return "error occured adding user"
	}

 
    
}

module.exports.loginUser = async function(newUser) {
	
	try{
		const query = {user: newUser.user}
		let user=await User.findOne(query);
		console.log(user)
		
		if (user==null)
			return "User Not Found"
	
		if(user.pass==newUser.pass)
			return true
		else 
			return "Password Invalid" 
	}
	
	catch(err)
	{
		console.log(err)
		return "error finding user"
	}
	
	 
}