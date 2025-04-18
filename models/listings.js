const mongoose = require("mongoose");
const Review = require("./reviews");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://assets-news.housing.com/news/wp-content/uploads/2022/02/27121904/featured-compressed-67.jpg",
    set: (v) =>
      v === ""
        ? "https://assets-news.housing.com/news/wp-content/uploads/2022/02/27121904/featured-compressed-67.jpg"
        : v,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
