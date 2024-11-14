const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Product = require("../models/product.js");


router.get("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let product = await Product.findById(id).populate("reviews");
    res.render("./pages/detail.ejs",{product});
}))
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Product.findByIdAndDelete(id);
    req.flash("success","SuccessFully Deleted");
    res.redirect("/products");
}))

module.exports=router;