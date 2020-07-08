var express = require('express'),
    router = express.Router({mergeParams:true}),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    middleWare = require('../middleware') 

//Comments new
router.get("/new",middleWare.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err)
        } else{
            res.render("comments/new",{campground:campground});
        }
    })
})

router.post("/",middleWare.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err, campground){
        if(err){
            console.log(err)
            res.redirect("/campgrounds");
        } else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save()
                    campground.comments.push(comment);
                    campground.save();
                    console.log(campground);
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
            //Comment.create()
        }
        
    })
})

//Comment Edit Route
router.get("/:comment_id/edit",middleWare.checkCommentOwnerShip,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            console.log(err);
            res.redirect("back")
        } else{
            res.render("comments/edit",{
                campground_id:req.params.id,
                comment:foundComment})
        }
    })
})

//Comment Update
router.put("/:comment_id",middleWare.checkCommentOwnerShip,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//Comment Destroy
router.delete("/:comment_id",middleWare.checkCommentOwnerShip,function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id,function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

module.exports = router;