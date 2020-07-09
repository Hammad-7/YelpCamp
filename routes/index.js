var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user')

router.get("/", function(req, res){
    res.render("landing");
});

//====================
//  AUTH ROUTES
// ===================
router.get("/register",function(req,res){
    res.render("register");
})

router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message);
            console.log(err);
            res.redirect("/register")
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to Yelp Camp "+user.username);
            res.redirect("/campgrounds");
        })
    })
})

router.get("/login",function(req,res){
    res.render("login");
})

router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){
})

//Logout route
router.get("/logout",function(req,res){
    req.logOut();
    req.flash("success","Logged you out!");
    res.redirect("/campgrounds");
})

module.exports = router;