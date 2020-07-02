var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name:"Ypacaraí Lake",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Lago1.jpg/250px-Lago1.jpg",
        description: " is a major body of water located in Paraguay, about 50 kilometres (31 mi) east of the capital,"+
        "Asunción.[1] The lake lies in the western part of the Asunción-Sapucai-Villarrica graben, a tectonic depression " +
        "from the Mesozoic Era, and drains to the northwest through the Salado River into the Paraguay River. The lake is surrounded by three cities:" +
        "Areguá, Ypacaraí, and San Bernardino, the latter two being located on its shore."

    },
    {
        name:"Itaipu Dam",
        image:  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Itaipu_geral.jpg/250px-Itaipu_geral.jpg",
        description: " (Portuguese: Barragem de Itaipu, Spanish: Represa de Itaipú; Portuguese pronunciation: [itɐjˈpu]," +
        "Spanish pronunciation: [itajˈpu]) is a hydroelectric dam on the Paraná River located on the border between Brazil and Paraguay." +
        "The construction of the dam was first contested by Argentina, but the negotiations and resolution of the dispute ended up setting the basis" +
        "for Argentine–Brazilian integration later on.[2]\r\n\r\nThe name \"Itaipu\" was taken from an isle that existed near the construction site." +
        "In the Guarani language, Itaipu means the sounding stone\".[3]" +
        "The Itaipu Dam's hydroelectric power plant produced the second most energy of any in the world as of 2020, " +
        "only surpassed by the Three Gorges Dam plant in energy production."

    },
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("added a campground");
                    //Create a comment
                    Comment.create(
                        {
                            text:"This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err,comment ){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        }
                    );
                }
            });
        });
    });
    
}

module.exports = seedDB; 