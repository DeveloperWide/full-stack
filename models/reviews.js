const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  rating: {
    type: String,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Review = model("Review", reviewSchema);
module.exports = Review;
