const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Product = require("../models/product.js");
const History=require("../models/history.js");
const {loggedin} = require('../middlewares/isloggedin.js');
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let product = await Product.findById(id);
    let history = await History.findById(id);
    await History.findByIdAndDelete(id);
    const historysave = new History({store:id});
    await historysave.save();
    res.render("./pages/detail.ejs");
}))
router.delete("/:id",loggedin,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Product.findByIdAndDelete(id);
    req.flash("success","SuccessFully Deleted");
    res.redirect("/products");
}))

module.exports=router;