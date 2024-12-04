const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const History=require("../models/history.js");
const {loggedin} = require('../middlewares/isloggedin.js');

router.get("/",loggedin, wrapAsync(async(req,res,next)=>{
    let historyuser = await History.find({userid:req.user._id}).populate("historydata.store");
    console.log(historyuser);
    res.render("./pages/history.ejs",{history});
}))
router.delete("/:id",loggedin,wrapAsync(async(req,res,next)=>{
    let {id}=req.params;
   await History.findByIdAndDelete(id);
    res.redirect("/history");
}))
module.exports=router;