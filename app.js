var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Campground = require('./models/campground')
var seedDB = require('./seeds');
var Comment = require("./models/comment");
var passport = require('passport')
var localStrategy = require('passport-local')
var User = require('./models/user')


var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes  = require('./routes/index');

//seedDB();
mongoose.connect("mongodb://localhost:27018/yelp_camp", { useUnifiedTopology: true, useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

//Passport configuration
app.use(require("express-session")({
    secret:"Once again Rusty wins cutest dog!",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(4000,function(){
    console.log("Server has started!");
})