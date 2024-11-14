const express = require('express');
const router = express.Router({mergeParams:true});
const validateschema=require("../validate.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Product = require("../models/product.js");
const ExpressError = require("../utils/ExpressError.js");
const reviewvalidateschema = require("../reviewvalidate.js");
const Review = require("../models/review.js");

const reviewhandler = (req,res,next)=>{
    let {error} = reviewvalidateschema.validate(req.body);
    if(error){
        throw new ExpressError(404,error);
    }
    else {
        next();
    }
}
router.post("/",reviewhandler,wrapAsync(async(req,res,next)=>{
    let {id}=req.params;
    let reviewuser = new Review(req.body);
    let product = await Product.findById(id);
    product.reviews.push(reviewuser);
    await reviewuser.save();
    await product.save();
    req.flash("success","SuccesFully Reviewed");
    res.redirect(`/product/${id}`);
}))
router.delete("/:rid",async(req,res)=>{
    let {id,rid}=req.params;
    //child delete before parent delete
    await Product.findByIdAndUpdate(id,{$pull : {reviews:rid}});//use for pull whole object from parent schema
    await Review.findByIdAndDelete(rid);
    req.flash("success","SuccesFully Review Deleted");
    res.redirect(`/product/${id}`);
});

module.exports=router;