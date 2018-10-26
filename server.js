var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var blog = require('./app/models/blogs');
var port = 3000;
var routes = require('./app/routes');


mongoose.connect('mongodb://127.0.0.1:27017/test');

app.set('view engine','ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : true}));
app.use('/public',express.static(__dirname+'/public'));
routes(app,blog);


blog.find({},function(err,data){
	for(var i=0; i< data.length; i++){
		if(data[i].body==""){
			blog.deleteOne({title: data[i].title},function(err){
			if(err)
				console.log(err);
			else
				console.log("Deleted");
		});
		}
	}
		
});

app.listen(port);
console.log("The server is running on port "+port);