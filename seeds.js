var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et cursus lacus. Nulla vel tristique felis. Ut volutpat vitae lacus ut feugiat. Maecenas nec odio urna. Mauris eget nulla a nisl dapibus faucibus nec ac arcu. Sed congue orci ac neque hendrerit, ut iaculis quam sagittis. Proin tempus dui eget tortor pretium congue. Phasellus ac vestibulum lectus. Morbi vitae quam quis enim sollicitudin mollis."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et cursus lacus. Nulla vel tristique felis. Ut volutpat vitae lacus ut feugiat. Maecenas nec odio urna. Mauris eget nulla a nisl dapibus faucibus nec ac arcu. Sed congue orci ac neque hendrerit, ut iaculis quam sagittis. Proin tempus dui eget tortor pretium congue. Phasellus ac vestibulum lectus. Morbi vitae quam quis enim sollicitudin mollis."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et cursus lacus. Nulla vel tristique felis. Ut volutpat vitae lacus ut feugiat. Maecenas nec odio urna. Mauris eget nulla a nisl dapibus faucibus nec ac arcu. Sed congue orci ac neque hendrerit, ut iaculis quam sagittis. Proin tempus dui eget tortor pretium congue. Phasellus ac vestibulum lectus. Morbi vitae quam quis enim sollicitudin mollis."
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;