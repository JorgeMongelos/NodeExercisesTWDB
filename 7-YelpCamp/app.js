/**********************
    Export libraries
**********************/ 
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

/******************** 
    DB mockup
********************/
var campGrounds = [
    {name:"Tiger Musky", image:"http://tigermuskyresort.com/wp-content/gallery/tigermusky/8tiger-musky-cabin.jpg" },
    {name:"Shady Nook", image:"https://img1.wsimg.com/isteam/ip/2974abf5-b960-408d-a068-84d1b44e6734/acf70465-07bc-463f-80ad-5731fd2f54e3.JPG/:/rs=w:400,h:500,cg:true,m/cr=w:800,h:500,a:cc" },
    {name:"Sisko's Pine Point", image:"https://siskosresort.com/wp-content/uploads/2019/11/eaglesfrommark.jpg" },{name:"Tiger Musky", image:"http://tigermuskyresort.com/wp-content/gallery/tigermusky/8tiger-musky-cabin.jpg" },
    {name:"Shady Nook", image:"https://img1.wsimg.com/isteam/ip/2974abf5-b960-408d-a068-84d1b44e6734/acf70465-07bc-463f-80ad-5731fd2f54e3.JPG/:/rs=w:400,h:500,cg:true,m/cr=w:800,h:500,a:cc" },
    {name:"Sisko's Pine Point", image:"https://siskosresort.com/wp-content/uploads/2019/11/eaglesfrommark.jpg" },{name:"Tiger Musky", image:"http://tigermuskyresort.com/wp-content/gallery/tigermusky/8tiger-musky-cabin.jpg" },
    {name:"Shady Nook", image:"https://img1.wsimg.com/isteam/ip/2974abf5-b960-408d-a068-84d1b44e6734/acf70465-07bc-463f-80ad-5731fd2f54e3.JPG/:/rs=w:400,h:500,cg:true,m/cr=w:800,h:500,a:cc" },
    {name:"Sisko's Pine Point", image:"https://siskosresort.com/wp-content/uploads/2019/11/eaglesfrommark.jpg" }
];

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
    
    res.render("campgrounds", {campGrounds: campGrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

/******************** 
      POST routes
**********************/
app.post("/campgrounds", function(req, res){

    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    //add to campgrounds array
    var newCampGround = {name: name, image:image};
    campGrounds.push(newCampGround);
    //redirect to /campgrounds template
    res.redirect("/campgrounds"); 
});



/********************************
    init port to listen for app
********************************/
app.listen(3000, function(){
    console.log("Server listening on port 3000");
});