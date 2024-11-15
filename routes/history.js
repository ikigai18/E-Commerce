const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const History=require("../models/history.js");
const {loggedin} = require('../middlewares/isloggedin.js');

router.get("/",wrapAsync(async(req,res,next)=>{
    let history = await History.find({}).populate("store");
    res.render("./pages/history.ejs",{history});
}))
router.delete("/:id",loggedin,wrapAsync(async(req,res,next)=>{
    console.log(req.user);
    let {id}=req.params;
   await History.findByIdAndDelete(id);
    res.redirect("/history");
}))
module.exports=router;