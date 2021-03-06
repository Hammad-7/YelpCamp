var express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground')
    middleWare = require('../middleware') 


//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/campgrounds",{campgrounds:allCampgrounds, currentUser:req.user});
       }
    });
});

//CREATE - add new campground to DB
router.post("/",middleWare.isLoggedIn,function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price; 
    var image = req.body.image;
    var desc = req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCampground = {name: name, price:price ,image: image, description: desc, author:author}

    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new",middleWare.isLoggedIn, function(req, res){
   res.render("campgrounds/new.ejs"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
})

router.get("/:id/edit",middleWare.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
    res.render("campgrounds/edit",{campground: foundCampground});
    
    })
})

router.put("/:id",middleWare.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//Destroy Campground route
router.delete("/:id",middleWare.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            req.flash("error","Campground Deleted!!")
            res.redirect("/campgrounds");
        }
    })
})



module.exports = router;