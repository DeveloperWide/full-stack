const Listing = require("../models/listings");
const Review = require("../models/reviews");


module.exports.createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review({ ...req.body.review });
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    let revRes = await newReview.save();
    let lisRes = await listing.save();
    req.flash("success", "Review Created Successfully");
    res.redirect(`/listings/${req.params.id}`);
  }

  module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    //find Lisitng and update it
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    //find  Review and delete it
    await Review.findByIdAndDelete(reviewId);
    //after this redirect to show page
    req.flash("success", "Review Deleted Successfully");
    res.redirect(`/listings/${id}`);
  }