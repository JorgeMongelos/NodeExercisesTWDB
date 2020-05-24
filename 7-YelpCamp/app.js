/**********************
    Export libraries
**********************/ 
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var mongoose = require("mongoose");
//write mongodb connection url, and save it to a variable
var mongodbURL = 'mongodb://localhost:27017/yelp_camp';

/******************** 
    Use mongoose api to connect to mongodb
    pass mongodb url as a parameter
    use the newUrlParser to parse connection string
********************/
mongoose.connect(mongodbURL, {useNewUrlParser: true, useUnifiedTopology: true});

/*****************************************************
            create database schema
*****************************************************/
var campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//create campground model

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create({
    name:"Sisko's Pine Point",
    image:"https://siskosresort.com/wp-content/uploads/2019/11/eaglesfrommark.jpg"},
    function(err, camp){
        if(err){
            console.log(err);
        }else{
            console.log("NEWLY CREATED CAMPGROUND");
            console.log(camp);
        }
    });*/




/*****************************************************
    set express to look for .ejs files automatically
*****************************************************/
app.set("view engine", "ejs");

/****************************************************
    init body-parser to parse string variables into
    .js variables
****************************************************/
app.use(bodyParser.urlencoded({extended: true}));

/****************************************************
   export css stylesheets
****************************************************/
app.use(express.static("public"));

/****************** 
     GET routes
*******************/
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({},function(err, campGrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campGrounds: campGrounds});  
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res){

    //Find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampGround){
        if(err){
            console.log(err);
        }else{
            //render show template with that campground
            res.render("show", {campgrounds: foundCampGround});
        }
    });
});

/******************** 
      POST routes
**********************/
app.post("/campgrounds", function(req, res){

    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    //add to campgrounds array
    var newCampGround = {name: name, image:image, description:description};
    Campground.create(newCampGround,
    function(err, camp){
        if(err){
            console.log(err);
        }else{
            //redirect to /campgrounds template
            res.redirect("/campgrounds"); 
        }
    });
});



/********************************
    init port to listen for app
********************************/
app.listen(3000, function(){
    console.log("Server listening on port 3000");
});
/*db.campgrounds.remove(
    {
        "_id" : ObjectId("5ecaa09e3d7c5a513701afc1")
    }
)*/