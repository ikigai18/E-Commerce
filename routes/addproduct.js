const express = require('express');
const router = express.Router({ mergeParams: true });
const validateschema = require("../validate.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Product = require("../models/product.js");
const ExpressError = require("../utils/ExpressError.js");

const validating = (req, res, next) => {
    let { error } = validateschema.validate(req.body);
    if (error) {
        return next(new ExpressError(404, error.message));
    }
    next();
};

router.get("/", (req, res) => {
        if(req.isAuthenticated())
    res.render("./pages/addproduct.ejs");
else {
    req.flash("error","You Must Be Looged In");
    res.send("Logged in first")
}
});

router.post("/", validating, wrapAsync(async (req, res) => {
    
    let newuser = new Product({ ...req.body });
    await newuser.save();
    req.flash("success", "Successfully Added");
    res.redirect("/products");
}));

module.exports = router;
