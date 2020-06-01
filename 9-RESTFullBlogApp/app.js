/***********************************************************************************************************************************************************
                                                                 Export libraries
************************************************************************************************************************************************************/ 
var bodyParser  = require("body-parser"),
    express     = require("express"),
    mongoose    = require("mongoose"),
    request     = require("request"),
    app         = express();
/***********************************************************************************************************************************************************
                                                                 APP CONFIG
************************************************************************************************************************************************************/
var mongodbURL = 'mongodb://localhost:27017/restful_blog_app';//db URL
mongoose.connect(mongodbURL, {useNewUrlParser: true, useUnifiedTopology: true});//db connection
app.set("view engine", "ejs"); //makes express look for .ejs files
app.use(bodyParser.urlencoded({extended: true}));// turns string into objects
app.use(express.static("public")); //serves css files

/***********************************************************************************************************************************************************
                                                             create database schema
************************************************************************************************************************************************************/
var blogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
/************************************************************************************************************************************************************
                                                         create blog model
*************************************************************************************************************************************************************/

var Blog = mongoose.model("Blog", blogSchema);

 /*Blog.create({
        title: "Test blog",
        image: "https://thehappypuppysite.com/wp-content/uploads/2018/06/How-Long-Do-English-Bulldogs-Live_-HP-long.jpg",
        body: "HELLO THIS IS A BLOG POST"
    });*/

/*************************************************************************************************************************************************************
                                                            RESTful routes
**************************************************************************************************************************************************************/
app.get("/", function(req, res){

    res.redirect("/blogs");
});
//INDEX route
app.get("/blogs", function(req, res){

    Blog.find({}, function(err, blogs){

        if(err){
            console.log("ERROR!");
        }else{
            res.render("index", {blogs: blogs});
        }
    });
});
//NEW route
app.get("/blogs/new", function(req, res){
    res.render("new");
});
//CREATE route
app.post("/blogs", function(req, res){

    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    });
});

/**************************************************************************************************************************************************************
                                                        init port to listen for app
***************************************************************************************************************************************************************/
app.listen(3000, function(){
    console.log("Server listening on port 3000");
});