
module.exports = function(app,blog){

	/*function(req,res,next){
		req.blog = {};
		next();
	}*/
	//console.log(blog);
	app.get('/home',function(req,res){
		blog.find({},function(err,data){
			if(data.length==0)
				console.log("NO data found");
			
		//	console.log(res);	
			res.render('home',{data:data});
		
		});		
	});

	app.get('/upload',function(req,res){
		res.render('upload.ejs');
		//res.send("This is a sample text....");
	});

	app.post('/upload',function(req,res){

		blog.findOne({title: req.body.title},function(err,data){
			if(err)
				throw err;
			if(data){
				res.render("error",{data: data});
			}else{
				var toUpload = new blog();
				toUpload.title = req.body.title;
				toUpload.body = req.body.body;
				toUpload.save(function(err){
			if(err)
				throw err;
			else{
				console.log("User saved");
			}

		});
				res.redirect('/home');
			}
		});

	
	
	});

	app.get('/blog/:title',function(req,res){
		console.log(req.params.title);
		//res.send(req.params.title);
		blog.findOne({title: req.params.title},function(err,data){
			if(!data)
				console.log("data not found");
			else
				//console.log(data.body);
				res.render('blogmain',{data:data});
		})
	});


	app.get('/validate/:title',function(req,res){
		blog.findOne({title: req.params.title},function(err,data){
			if(data==null)
				res.send({success: true});
			else
				res.send({success: false});
		});

		//res.send("false");
	});

}