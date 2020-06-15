/***********************************************************************************************************************************************************
                                                                 Export libraries
************************************************************************************************************************************************************/ 
var bodyParser      = require("body-parser"),
methodOverride      = require("method-override"),
expressSanitizer    = require("express-sanitizer"),
express             = require("express"),
mongoose            = require("mongoose"),
request             = require("request"),
app                 = express();
/***********************************************************************************************************************************************************
                                                                 APP CONFIG
************************************************************************************************************************************************************/
var mongodbURL = 'mongodb://localhost:27017/associatons_app';//db URL
mongoose.connect(mongodbURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});//db connection
app.set("view engine", "ejs"); //makes express look for .ejs files
app.use(bodyParser.urlencoded({extended: true}));// turns string into objects
app.use(expressSanitizer());//sanitizes inputs
app.use(methodOverride("_method"));//Overrides post method to use delete and put methods
app.use(express.static("public")); //serves css files


/***********************************************************************************************************************************************************
                                                             create database schema
************************************************************************************************************************************************************/
var postSchema = mongoose.Schema({//collection schema(many)
    title: String,
    content: String,
});

var userSchema = mongoose.Schema({//collection schema(one)
    email: String,
    name: String,
    //collection schema(many):collection schema(one) relationship 
    posts:[postSchema]
});
/************************************************************************************************************************************************************
                                                         create blog model
*************************************************************************************************************************************************************/
var Posts = mongoose.model("Posts", postSchema);//Posts model
var User = mongoose.model("User", userSchema);// User model


/*************************************************************************************************************************************************************
                                                            RESTful routes
**************************************************************************************************************************************************************/
/* var newUser = new User({
    email: "charlie@brown.edu",
    name: "Charlie Brown"
});
newUser.save(function(err, user){
    if(err){
        console.log(err);
    }else{
        console.log(user);
    }
}); */

/* var newPost = new Posts({
    title:"Reflections on Apples",
    content: "They are delicious"
});
newPost.save(function(err, post){
    if(err){
        console.log(err);
    }else{
        console.log(post);
    }
}); */

/* var newUser = new User({
    email: "hermione@hogwarts.edu",
    name: "Hermione Granger"
});

newUser.posts.push({
    title: "How to brew polyjuice potion",
    content: "Just kidding. Go to potions class to learn it!"
});
newUser.save(function(err, user){
    if(err){
        console.log(err);
    }else{
        console.log(user);
    }
}); */

User.findOne({name: "Hermione Granger"}, function(err, user){
    if(err){
        console.log(err);
    }else{
        console.log(user);
        user.posts.push({
            title:"3 Things I really hate",
            content: "Voldemort, Voldemort, and Voldemort"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            }else{
                console.log(user);
            }
        });
    }
});

/**************************************************************************************************************************************************************
                                                        init port to listen for app
***************************************************************************************************************************************************************/
app.listen(3000, function(){
    console.log("Server listening on port 3000");
});