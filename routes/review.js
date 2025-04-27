const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utills/wrapAsync");
const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware");
const reviewController = require("../controllers/reviews")

//Create new Review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// Delete Review

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
