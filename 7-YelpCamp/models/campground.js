/***********************************************************************************************************************************************************
                                                             Schema Module
************************************************************************************************************************************************************/
//Import library
var mongoose = require("mongoose");

//Create DB Schema
var campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//return modularized code
module.exports = mongoose.model("Campground", campgroundSchema);