/***********************************************************************************************************************************************************
                                                                 Export libraries
************************************************************************************************************************************************************/ 
var bodyParser      = require("body-parser"),
methodOverride      = require("method-override"),
expressSanitizer    = require("express-sanitizer"),
express             = require("express"),
mongoose            = require("mongoose"),
request             = require("request"),
Post                = require("./models/post"),//modularized code
User                = require("./models/user"),//modularized code
app                 = express();
/***********************************************************************************************************************************************************
                                                                 APP CONFIG
************************************************************************************************************************************************************/
var mongodbURL = 'mongodb://localhost:27017/references_app';//db URL
mongoose.connect(mongodbURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});//db connection
app.set("view engine", "ejs"); //makes express look for .ejs files
app.use(bodyParser.urlencoded({extended: true}));// turns string into objects
app.use(expressSanitizer());//sanitizes inputs
app.use(methodOverride("_method"));//Overrides post method to use delete and put methods
app.use(express.static("public")); //serves css files

/*************************************************************************************************************************************************************
                                                            RESTful routes
**************************************************************************************************************************************************************/

/*  User.create({
    email: "bob@gmail.com",
    name: "Bob Belcher"
}); */

/* Post.create({
    title: "How to cook the best burger part 3",
    content:"lkjsadfjkn;asdnfgklasdfkljnglaenrg"
}, function(err, post){
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err)
                }else{
                    console.log(data);
                }
            });
        }
    });
}); */
User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err);
    }else{
        console.log(user);
    }
});


/**************************************************************************************************************************************************************
                                                        init port to listen for app
***************************************************************************************************************************************************************/
app.listen(3000, function(){
    console.log("Server listening on port 3000");
});