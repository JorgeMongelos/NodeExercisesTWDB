/**********************
    Export libraries
**********************/ 
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

/*****************************************************
    set express to look for .ejs files automatically
*****************************************************/
app.set("view engine", "ejs");

/****************************************************
    init body-parser to parse string variables into
    .js variables
****************************************************/
app.use(bodyParser.urlencoded({extended: true}));

/*****************************
    init /home (search) route
*****************************/
app.get("/", function(req, res){

    res.render("search");    

});

/*****************************
    init /results route
*****************************/
app.get("/results", function(req, res){
    var query = req.query.movieQuery;
    var url = "http://omdbapi.com/?s="+query+"&apikey=thewdb";
    request(url,function(error,response, body){
        if(!error && response.statusCode == 200){
            var results = JSON.parse(body);
            res.render("results", {results: results});
        }
    });
});

/*****************************
    init request to OMDB API
*****************************/
/*request("http://omdbapi.com/?s=matrix",function(error,response, body){
    if(!error && response.statusCode == 200){
        var parsed = JSON.parse(body);
        console.log(parsed);
    }
});*/


/********************************
    init port to listen for app
********************************/
app.listen(3000, function(){
    console.log("Server listening on port 3000");
});