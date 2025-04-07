const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    description: {
        type: String,
        required : true
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
        required: true
    },
    location: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;