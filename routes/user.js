const express = require("express");
const wrapAsync = require("../utills/wrapAsync");
const passport = require("passport");
const { saveRedirctUrl } = require("../middleware");
const router = express.Router();
const userController = require("../controllers/users")


router.route("/signup").get(userController.renderSignupForm).post(wrapAsync(userController.signup)
);

router.route("/login").get(userController.renderLoginForm).post(
  saveRedirctUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.post("/logout", userController.logout);

module.exports = router;
