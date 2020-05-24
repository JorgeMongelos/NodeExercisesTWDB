//configure connection to database
var mongoose  = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app', {useNewUrlParser: true});

//create collection schema
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

//create programmatic object from collection schema
var Cat = mongoose.model("Cat", catSchema);

//create a record to be inserted into collection
var george = new Cat({
    name:"Mrs. Norris",
    age:7,
    temperament:"Evil"
});

//save it into database
/*george.save(function(err, cat){
    if(err){
        console.log("SOMETHING WENT WRONG!");
    }else{
       console.log("WE JUST SAVED A CAT TO THE DB");
       console.log(cat); 
    }
});*/

//retrieve all cats from the DB and console.log each one
/*Cat.find({}, function(err, cats){
    if(err){
        console.log("OH NO, ERROR!");
        console.log(err);
    }else{
       console.log("ALL THE CATS....");
       console.log(cats); 
    }
});*/

Cat.create({
    name:"Snow White",
    age: 15,
    temperament: "Bland"
},function(err, cats){
    if(err){
        console.log("OH NO, ERROR!");
        console.log(err);
    }else{
       console.log("ALL THE CATS....");
       console.log(cats); 
    }
});
