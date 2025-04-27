const Listing = require("../models/listings");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
  };


  module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
  }

  module.exports.createListing = async (req, res, next) => {
      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id;
      await newListing.save();
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
          res.render("listings/edit.ejs", { listing });
        }

        module.exports.updateListing = async (req, res, next) => {
            let { id } = req.params;
            const listing = await Listing.findByIdAndUpdate(
              id,
              {
                $set: { ...req.body.listing },
              },
              { runValidators: true }
            );
            req.flash("success", "Listing Updated Successfully");
            res.redirect(`/listings/${id}`);
          }

          module.exports.destroyListing = async (req, res) => {
            let { id } = req.params;
            let listing = await Listing.findByIdAndDelete(id);
            req.flash("success", "Listing Deleted Successfully");
            res.redirect("/listings");
          }