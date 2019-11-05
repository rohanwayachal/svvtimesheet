const express = require('express')
const path = require('path')
const app = express()
 const bodyParser = require('body-parser');
 
 
 const mongoose = require('mongoose');
 const config = require('./config/database');

mongoose.connect(config.database,{useNewUrlParser: true});
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});



app.use(bodyParser.urlencoded({ extended: false }))
// Body Parser Middleware
app.use(bodyParser.json());
 
app.use(express.static(path.join(__dirname, 'public')));

 



const User = require('./model/user');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'))
})

app.post('/', async function (req, res) {
  	let newUser = new User({
    user: req.body.user,
    pass: req.body.pass,
	});
	
	let valid=await User.loginUser(newUser)
		
	if(valid===true)
	res.json({"data":true})
	else
	res.json({"data":valid})


	
	
})





app.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname+'/home.html'))
})

app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname+'/register.html'))
})


app.post('/register',async function (req, res) {
	

	let newUser = new User({
    user: req.body.user,
    pass: req.body.pass,
	});
	
	
	let valid=await User.addUser(newUser)
	
	console.log("valid "+valid)
	
	if(valid===true)
	res.json({"data":true})
	else
	res.json({"data":valid})
	
})
 
app.listen(3000)