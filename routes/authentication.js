const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require('passport');
const { saveredirect } = require('../middlewares/isloggedin.js');

router.get("/login",(req,res,next)=>{
    res.render("./pages/login.ejs");
});
router.get("/signup",(req,res,next)=>{
    res.render("./pages/signup.ejs");
})
router.post("/signup",wrapAsync(async(req,res,next)=>{
    let{email,username,password}=req.body;
    const newuser = new User({email,username});
    const registereduser =await User.register(newuser,password);
    req.login(registereduser,err=>{
        if(err){
            return next(err);
        }
        req.flash("success","Successfully Logged in");
        res.redirect("/");
    })
   
}))
router.post('/login',saveredirect,
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res,next)=>{
        req.flash("success","Successfully Logged in");
        res.redirect((res.locals.redirectUrl || '/'));
})
module.exports=router;