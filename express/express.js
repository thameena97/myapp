
var express = require('express')
var app = express()
var http = require('http')
var path = require("path")
var db = require('./database')
var bodyParser=require('body-parser')

db.create()
app.get('/', function (req, res){
	res.sendFile(path.join('/home/thameena/environments/myapp/express'+'/login.html'))
	
})

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/',function (req,res){
 var data = db.fetch()
 var flag_name = 0
 var flag_pass= 0
 var pwd = req.body.pwd;
 var uname = req.body.uname;
 for(var i=0; i<data.length; i+=2){
	if(data[i]==uname){
		flag_name=1;	
		if(data[i+1]==pwd){
			flag_pass=1
		}
		
	}}
	
	if (flag_name==0){
		return res.redirect('/register')
	}
	else{
		if (flag_pass==0){
			res.send("Invalid password")
		}
		else{
			res.send("Successfully logged in")
		}
	}
 
	return res.redirect('register')
})

app.get('/register', function(req,res){
 res.sendFile(path.join('/home/thameena/environments/myapp/express'+'/register.html'))
})

app.post('/register', function(req,res){
 db.insert(req.body.uname,req.body.pwd)
 return res.redirect('/')
})
 
app.listen(3000, function() {
	console.log('App listening on port 3000!')
})



