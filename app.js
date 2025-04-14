const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const ejsMate = require("ejs-mate");
const Listing = require("./models/listings");
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utills/ExpressError");
const wrapAsync = require("./utills/wrapAsync");
const { listingSchema } = require("./schema");


const validateListing = (req, res, next) => {
  let {error} = listingSchema.validate(req.body);
  if(error){
    throw new ExpressError(400, error)
  }else{
    next();
  }
}

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
  Listing;
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//Redirect On Listings Page
app.get("/", (req, res) => {
  res.redirect("/listings");
});

//Retrive All Listings
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
  })
);

//Render Form
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Create Route
app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res, next) => {
    const listing = new Listing(req.body.listing);
    await listing.save();
    res.redirect("/listings");
  })
);

//Show Route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      next(new ExpressError(404, "Listing Not Found!"));
    }
    res.render("listings/show.ejs", { listing });
  })
);

//Edit Form
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

//Update Route
app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {
      $set: { ...req.body.listing },
    }, {runValidators: true});
    res.redirect(`/listings/${id}`);
  })
);

//Destroy Route
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    console.log(listing);
    res.redirect("/listings");
  })
);

//404 for Another Routes
app.all("*", (req, res) => {
  throw new ExpressError(404, "Page Not Found!");
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occurred" } = err;
  res.status(status).render("error" , {message});
});

app.listen(PORT, () => {
  console.log(`Server is listing on PORT ${PORT}`);
});
