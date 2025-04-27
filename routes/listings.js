const express = require("express");
const router = express.Router();
const wrapAsync = require("../utills/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings")


router.route("/").get(
  wrapAsync(listingController.index)
).post(
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.createListing)
);


//Render Form
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id").get(
  wrapAsync(listingController.showListing)
).put(
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing)
).delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

//Edit Form
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;