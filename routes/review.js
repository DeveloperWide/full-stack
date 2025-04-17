const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utills/ExpressError");
const wrapAsync = require("../utills/wrapAsync");
const Listing = require("../models/listings");
const { reviewSchema } = require("../schema");
const Review = require("../models/reviews");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

//Create new Review
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review({ ...req.body.review });

    listing.reviews.push(newReview);

    let revRes = await newReview.save();
    let lisRes = await listing.save();
    res.redirect(`/listings/${req.params.id}`);
  })
);

// Delete Review

router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    //find Lisitng and update it
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    //find  Review and delete it
    await Review.findByIdAndDelete(reviewId);
    //after this redirect to show page
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
