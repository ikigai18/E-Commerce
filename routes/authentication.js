const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require('passport');

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
    req.flash("success","Successfully Logged in");
    res.redirect("/user/login");
   
}))
router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res,next)=>{
        res.redirect("/products");
})
module.exports=router;