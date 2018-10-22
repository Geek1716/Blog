var express = require('express');
var app = express();
var cors = require('cors');
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

blog.deleteOne({title: ""},function(err){
	console.log("Deleted!");
	if(err)
		console.log(err);
});

/*blog.find({title: ""},function(err,data){
	for(var i=0; i< data.length; i++)
		console.log(data[i].title);
});	*/

app.listen(port);
console.log("The server is running on port "+port);