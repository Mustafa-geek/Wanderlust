const express = require("express")
const router = express.Router();
const Listing = require("../models/listing.js")   //schema is defined
const wrapAsync = require("../utils/wrapAsync.js")
const {isLoggedIn ,isOwner,validateListing} = require("../middleware.js")

const listingConrtroller = require("../controllers/listings.js")

//Index route
router.get("/",wrapAsync(listingConrtroller.index))
  
//New route
//put this route above listings/:id otherwise /new will be considered as :id
router.get("/new",isLoggedIn,listingConrtroller.renderNewForm)


 //Show route
router.get("/:id",wrapAsync(listingConrtroller.showListing))
 

 //Create route
//Saving the filled form as a listing in the db 
router.post("/",validateListing ,isLoggedIn, wrapAsync(listingConrtroller.createListing));
 

//EDIT route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingConrtroller.renderEditForm))
 

//Update route
//after clking edit btn, changes are made
router.put("/:id" ,validateListing,isOwner, isLoggedIn, wrapAsync(listingConrtroller.updateListing))
 

//Delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingConrtroller.destroyListing));
 
 

module.exports = router