'use strict';
var express = require('express'),
	posts = require('./mock/posts.json');

var app = express();

var port = process.env.PORT || 3000;

app.use('/static',express.static(__dirname+'/public'));

app.set('view engine','pug');
app.set('views', __dirname + '/views');

var postsLists = Object.keys(posts).map(function(post){
	return posts[post];
});

app.get('/',function(req,res){
	var path = req.path;
	res.render('index',{path: path});
});

app.get('/blog/:title?',function(req,res){
	var title = req.params.title;
	if(title === undefined){
		res.render('blog',{posts: postsLists});
	}else{
		var post = posts[title] || {};
		res.render('blog',{posts: post});
	}
});

app.listen(port,function(){
	console.log("Listening on Port:",port);
});