
module.exports = function(app,blog){

	/*function(req,res,next){
		req.blog = {};
		next();
	}*/
	//console.log(blog);
	app.get('/home',function(req,res){
		blog.find({},function(err,data){
			if(!data)
				console.log("NO data found");
			else{	
			res.render('home',{data:data});
		}
		});		
	});

	app.get('/upload',function(req,res){
		res.render('upload.ejs');
	});

	app.post('/upload',function(req,res){
		var toUpload = new blog();
		toUpload.title = req.body.title;
		toUpload.body = req.body.body;
		toUpload.save(function(err){
			if(err)
				console.log(err);
			else{
				console.log("User saved");
			}

		});
		res.redirect('/home');
	});

	app.get('/blog/:title',function(req,res){
		console.log(req.params.title);
		//res.send(req.params.title);
		blog.findOne({title: req.params.title},function(err,data){
			if(!data)
				console.log("data not found");
			else
				console.log(data.body);
				res.render('blogmain',{data:data});
		})
	});
}