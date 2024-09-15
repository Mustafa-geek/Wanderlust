const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js"); //schema is defined
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");  //core backend logic is defined
const multer  = require('multer') //for image parsing
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})  //storing in cloud

router
  .route("/")
  .get(wrapAsync(listingController.index)) //Index route
  .post(                                   //Create route //Saving the filled form as a listing in the db
    isLoggedIn,
    upload.single('listing[image]'),  //uploading image
    validateListing,
    wrapAsync(listingController.createListing)
  ); 

  
//New route
//put this route above listings/:id otherwise /new will be considered as :id
router.get("/new", isLoggedIn, listingController.renderNewForm);


router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) //Show route
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),  //uploading image
    validateListing, //Update route  //after clking edit btn, changes are made
    isOwner,
    wrapAsync(listingController.updateListing)
  )
  .delete(          //Delete route
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

//EDIT route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
