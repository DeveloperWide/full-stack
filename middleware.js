module.exports.isLoggedIn = (req ,res ,next) => {
    if (!req.isAuthenticated()) {
        req.session.redirctUrl = req.originalUrl;
        req.flash("error", "You must be log in!");
        return res.redirect("/login");
      }
      next();
}

module.exports.saveRedirctUrl = (req, res, next) => {
  if(req.session.redirctUrl){
    res.locals.redirectUrl = req.session.redirctUrl;
  }
  next();
}