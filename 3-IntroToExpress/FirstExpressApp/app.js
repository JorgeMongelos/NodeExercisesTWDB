var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there!!!");
});

app.get("/bye", function(req, res){
    res.send("Goodbye!!!");
});

app.get("/dog", function(req, res){
    res.send("MEOW!!!");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
    res.send("WELCOME TO THE COMMENTS PAGE");
});

app.get("/r/:subredditName", function(req, res){
    var subreddit = req.params.subredditName.toUpperCase();
    res.send("WELCOME TO THE " + subreddit + " SUBREDDIT!!");
});

app.get("*", function(req, res){
    res.send("YOU ARE A STAR!!!");
});

app.listen(3000, function(){

    console.log('Server listening on port 3000');  
});