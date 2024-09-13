const express = require("express")
const router = express.Router({ mergeParams: true }); //mergeparams ki wajah se /listings/:id mei ki /:id review.js tak pahuchri...nhi toh wo app.js mei ich ruk jaati thi
const Listing = require("../models/listing.js")   //schema is defined
const Review = require("../models/review.js")   //schema is defined
const wrapAsync = require("../utils/wrapAsync.js")
const {validatereview, isLoggedIn, isreviewAuthor} = require("../middleware.js")

const reviewController = require("../controllers/review.js")
//Reviews
//Post review
router.post("/", validatereview,isLoggedIn ,wrapAsync(reviewController.createReview))
  
// Delete review
router.delete("/:reviewId", isLoggedIn,isreviewAuthor,wrapAsync(reviewController.destroyReview));
  
module.exports = router