/***********************************************************************************************************************************************************
                                                             Schema Module
************************************************************************************************************************************************************/
//Import library
var mongoose = require("mongoose");

//Create DB Schema
var campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//return modularized code
module.exports = mongoose.model("Campground", campgroundSchema);