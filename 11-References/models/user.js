/***********************************************************************************************************************************************************
                                                             create database schema
************************************************************************************************************************************************************/
//Import library
var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

//return modularized code
module.exports = mongoose.model("User", userSchema);