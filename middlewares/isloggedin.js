const loggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You Must Be Looged In");
        res.redirect("/user/login");
    }
    else {
        next();
    }
}
const saveredirect = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl ;
    }
    next();
}
module.exports = {loggedin,saveredirect};