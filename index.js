const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const port = 8080;
app.use(methodOverride('_method'));
app.engine('ejs',engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
const mongoose = require('mongoose');
const Product = require("./models/product.js");
const ExpressError=require("./utils/ExpressError.js");
const wrapAsync=require("./utils/wrapAsync.js");
const addproduct = require("./routes/addproduct.js");
const product = require("./routes/product.js");
const review=require("./routes/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport=require('passport');
const LocalStratergy=require('passport-local');
const User = require("./models/user.js");
const user_router = require("./routes/authentication.js");

main().then(()=>{console.log("Connection Successful")}).catch(err=>{console.log(err)})
async function main() { await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");}

const OnSession = {
    secret:"mysupersecretecode",
    resave:false,
    saveUninitialized:true,
    cookie : {
        expires : Date.now()+ 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true
    }
}
app.use(session(OnSession));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    next();
})

app.use("/addproduct",addproduct);
app.use("/product",product);
app.use("/product/:id/reviews",review);
app.use("/user",user_router); 

app.get("/",(req,res)=>{
    res.render("./pages/home.ejs");
})
app.get("/products",wrapAsync(async(req,res)=>{
    let products = await Product.find({});
    res.render("./pages/products.ejs",{products});
}))

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
})
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something Went Wrong"}=err;
    req.flash("error",message);
    res.redirect("/")
})

app.listen(port,()=>{
    console.log("Listening...");
})