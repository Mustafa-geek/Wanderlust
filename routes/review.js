const express = require("express")
const router = express.Router({ mergeParams: true }); //mergeparams ki wajah se /listings/:id mei ki /:id review.js tak pahuchri...nhi toh wo app.js mei ich ruk jaati thi
const Listing = require("../models/listing.js")   //schema is defined
const Review = require("../models/review.js")   //schema is defined
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const {reviewSchema} = require("../schema.js")  //joi is required


const validatereview = (req,res,next)=>{  //using joi (for error handling)
    let {error} = reviewSchema.validate(req.body)
    if(error){
     throw new ExpressError(400,error)
    }
    else{
        next();
    }
}



//Reviews
//Post review
router.post("/", validatereview, wrapAsync(async(req,res)=>{
   
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review)   // Creating an instance from review.js aur backend se wo review obj ku jo show.ejs mei hai
  
     listing.review.push(newReview) ///pushing into review array that has been added in the listing schema (see listing.js)
  
      await newReview.save()
      await listing.save()
      req.flash("message","New Review is  Created!!");
      res.redirect(`/listings/${listing._id}`)
  
  }))
  
  // Delete review
  router.delete("/:reviewId", wrapAsync(async(req,res)=>{
     let {id , reviewId} = req.params;
     await Listing.findByIdAndUpdate(id, {$pull: {review : reviewId}})    // wo waale listing ke id ke andar jaake pull karo review array(listing.js) mei se wo waali reviewId ku 
     await  Review.findByIdAndDelete(reviewId);
     req.flash("failure","Review Deleted!!");
     res.redirect(`/listings/${id}`)
  }));
  

  
module.exports = router