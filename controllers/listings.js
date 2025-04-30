const { cloudinary } = require("../cloudConfig");
const Listing = require("../models/listings");
const axios = require("axios");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
};


module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
}

module.exports.createListing = async (req, res, next) => {
  const geoResponse = await axios.get("https://nominatim.openstreetmap.org/search", {
    params: {
      q: req.body.listing.location,
      format: "json",
      limit: 1
    },
    headers: {
      "User-Agent": "Wanderlust/1.0 (maheshrana9520@gmail.com)" // Required by Nominatim
    }
  });

  let lat = null;
  let lon = null;

  if (geoResponse.data && geoResponse.data.length > 0) {
    lat = geoResponse.data[0].lat;
    lon = geoResponse.data[0].lon;
  }

  if (!lat || !lon) {
    req.flash("error", "Could not find location. Please enter a valid address.");
    return res.redirect("/listings/new");
  }
  
  const newListing = new Listing({
    ...req.body.listing, geometry: {
      type: "Point",
      coordinates: [lon, lat], // GeoJSON format
    },
    owner: req.user._id,
    image: {
      url: req.file.path,
      filename: req.file.filename
    }
  });
  const listing = await newListing.save();
  req.flash("success", "Listing Created Successfully");
  res.redirect("/listings");
}

module.exports.showListing = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate({
    path: "reviews",
    populate: {
      path: "author"
    }
  }).populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
}

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  }

  let originalImg = listing.image.url;
  let transformedImg = originalImg.replace("upload/", "upload/w_250/");
  res.render("listings/edit.ejs", { listing, transformedImg });
}

module.exports.updateListing = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(
    id,
    { $set: { ...req.body.listing } },
    { new: true }
  );

  if (req.file && req.file.path && req.file.filename) {
    // Delete old image from cloudinary
    if (listing.image && listing.image.filename) {
      await cloudinary.uploader.destroy(listing.image.filename);
    }

    // Save new image
    listing.image.url = req.file.path;
    listing.image.filename = req.file.filename;
    await listing.save();
  }
  req.flash("success", "Listing Updated Successfully");
  res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully");
  res.redirect("/listings");
}