const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utills/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

const sessionOptions = {
  secret: "mysupersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() * 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

const listingRoutes = require("./routes/listings.js");
const reviewRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");

app.use(methodOverride("_method"));

// use ejs-locals for all ejs templates:
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // so you can render('index')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main()
  .then(() => {
    console.log(`Connected To DB`);
  })
  .catch((er) => {
    console.log(`Error :-`, er);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/demoUser", async (req, res) => {
  let fakeUser = new User({
    email: "mahesh@gmail.com",
    username: "mahesh.codes",
  });

  const registeredUser = await User.register(fakeUser, "helloworld");
  res.send(registeredUser);
});

//Redirect On Listings Page
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

//404 for Another Routes
app.all("*", (req, res) => {
  throw new ExpressError(404, "Page Not Found!");
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occurred" } = err;
  res.status(status).render("error", { message });
});

app.listen(PORT, () => {
  console.log(`Server is listing on PORT ${PORT}`);
});
