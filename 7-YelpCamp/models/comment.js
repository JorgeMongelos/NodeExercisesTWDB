/***********************************************************************************************************************************************************
                                                             Schema Module
************************************************************************************************************************************************************/
//Import library
var mongoose = require("mongoose");

//Create DB Schema
var commentSchema = mongoose.Schema({
    text: String,
    author: String
});

//return modularized code
module.exports = mongoose.model("Comment", commentSchema);