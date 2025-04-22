const express = require("express");
const User = require("../models/user");
const wrapAsync = require("../utills/wrapAsync");
const passport = require("passport");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("../views/users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let user = new User({ email, username });
      let newUser = await User.register(user, password);
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
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome Back on Wanderlust");
    res.redirect("/listings");
  }
);

module.exports = router;
