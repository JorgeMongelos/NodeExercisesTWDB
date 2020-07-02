/******************************************************************************************************************************************************************
                                                              Import libraries && Frameworks
*******************************************************************************************************************************************************************/ 
var expressSanitizer    = require("express-sanitizer"),
    methodOverride      = require("method-override"),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    request             = require("request"),
    express             = require("express"),
    app                 = express();
    seedDB              = require("./seed");
//seedDB();
/***********************************************************************************************************************************************************
                                                                 APP CONFIG
************************************************************************************************************************************************************/
var mongodbURL = 'mongodb://localhost:27017/yelp_camp';//db URL
mongoose.connect(mongodbURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});//db connection
app.set("view engine", "ejs"); //makes express look for .ejs files
app.use(bodyParser.urlencoded({extended: true}));// turns string into objects
app.use(expressSanitizer());//sanitizes inputs
app.use(methodOverride("_method"));//Overrides post method to use delete and put methods
app.use(express.static("public")); //serves css files

/*****************************************************************************************************************************************************************
                                                                    Import Schemas
******************************************************************************************************************************************************************/
var Campground = require("./models/campground");
var Comment = require("./models/comment");



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

/*************************************************************************************************************************************************************
                                                            RESTful routes
**************************************************************************************************************************************************************/
app.get("/", function(req, res){
    res.render("landing");
});
/*************************************************************************************************************************************************************
                                                           INDEX - show all campgrounds
**************************************************************************************************************************************************************/

app.get("/campgrounds", function(req, res){
    Campground.find({},function(err, campGrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campGrounds: campGrounds});  
        }
    });
});

/*************************************************************************************************************************************************************
                                                           CREATE - add new campground to DB
**************************************************************************************************************************************************************/
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

/*************************************************************************************************************************************************************
                                                          NEW - show form to create a new campground
**************************************************************************************************************************************************************/
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

/*************************************************************************************************************************************************************
                                                           SHOW - shows more info about one campground
**************************************************************************************************************************************************************/
app.get("/campgrounds/:id", function(req, res){

    //Find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampGround){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampGround);
            //render show template with that campground
            res.render("show", {campgrounds: foundCampGround});
        }
    });
});

/**************************************************************************************************************************************************************
                                                        init port to listen for app
***************************************************************************************************************************************************************/
app.listen(3000, function(){
    console.log("Server listening on port 3000");
});