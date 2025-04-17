const express = require("express");
const router = express.Router();
const ExpressError = require("../utills/ExpressError");
const wrapAsync = require("../utills/wrapAsync");
const Listing = require("../models/listings");
const { listingSchema } = require("../schema");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

//Retrive All Listings
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
  })
);

//Render Form
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Create Route
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res, next) => {
    const listing = new Listing(req.body.listing);
    await listing.save();
    res.redirect("/listings");
  })
);

//Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      next(new ExpressError(404, "Listing Not Found!"));
    }
    res.render("listings/show.ejs", { listing });
  })
);

//Edit Form
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

//Update Route
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(
      id,
      {
        $set: { ...req.body.listing },
      },
      { runValidators: true }
    );
    res.redirect(`/listings/${id}`);
  })
);

//Destroy Route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    console.log(listing);
    res.redirect("/listings");
  })
);

module.exports = router;
