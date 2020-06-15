//Import library
var mongoose = require("mongoose");

//Copy/paste code to be modularized.
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
//return modularized code
module.exports = mongoose.model("Post", postSchema);

