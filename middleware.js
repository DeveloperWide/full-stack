const Listing = require("./models/listings");
const Review = require("./models/reviews");
const { reviewSchema, listingSchema } = require("./schema");
const ExpressError = require("./utills/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirctUrl = req.originalUrl;
    req.flash("error", "You must be log in!");
    return res.redirect("/login");
  }
  next();
}

module.exports.saveRedirctUrl = (req, res, next) => {
  if (req.session.redirctUrl) {
    res.locals.redirectUrl = req.session.redirctUrl;
  }
  next();
}

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this listing")
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id } = req.params;
  let { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this review")
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};