const express = require("express");
const User = require("../models/user");
const wrapAsync = require("../utills/wrapAsync");
const passport = require("passport");
const { saveRedirctUrl } = require("../middleware");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
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
  })
);

router.get("/login", (req, res) => {
  res.render("../views/users/login.ejs");
});

router.post(
  "/login",
  saveRedirctUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome Back on Wanderlust");
    console.log(res.locals.redirectUrl);
    let redirctUrl = res.locals.redirectUrl || "/listings";
    console.log(redirctUrl);
    res.redirect(redirctUrl);
  }
);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged Out!")
    res.redirect("/listings")
  })
});

module.exports = router;
