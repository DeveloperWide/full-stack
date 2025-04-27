const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
  }

  module.exports.signup = async (req, res) => {
      try {
        let { username, email, password } = req.body;
        let user = new User({ email, username });
        let newUser = await User.register(user, password);
        req.login(newUser, (err) => {
          if (err) {
            req.flash("error", err.message);
            return res.redirect("/listings")
          }
          req.flash("success", "Welcome Back on Wanderlust");
          res.redirect("/listings");
        })
      } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
      }
    }

    module.exports.renderLoginForm = (req, res) => {
        res.render("../views/users/login.ejs");
      }

      module.exports.login = (req, res) => {
        req.flash("success", "Welcome Back on Wanderlust");
        console.log(res.locals.redirectUrl);
        let redirctUrl = res.locals.redirectUrl || "/listings";
        console.log(redirctUrl);
        res.redirect(redirctUrl);
      }

      module.exports.logout = (req, res, next) => {
        req.logout((err) => {
          if (err) {
            return next(err);
          }
          req.flash("success", "You are logged Out!")
          res.redirect("/listings")
        })
      }