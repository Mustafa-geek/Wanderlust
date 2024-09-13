const Listing = require("../models/listing.js")   //schema is defined
const Review = require("../models/review.js")   //schema is defined


module.exports.createReview = async(req,res)=>{
   
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review)   // Creating an instance from review.js aur backend se wo review obj ku jo show.ejs mei hai
  
    newReview.author = req.user._id;   //wo time pe jo loggedin rehta unhe wo review jo dalta (thus wo review ka owner banjata)
     listing.review.push(newReview) ///pushing into review array that has been added in the listing schema (see listing.js)
  
      await newReview.save()
      await listing.save()
      req.flash("message","New Review is  Created!!");   
      res.redirect(`/listings/${listing._id}`)
  
  }


  module.exports.destroyReview = async(req,res)=>{
    let {id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {review : reviewId}})    // wo waale listing ke id ke andar jaake pull karo review array(listing.js) mei se wo waali reviewId ku 
    await  Review.findByIdAndDelete(reviewId);
    req.flash("failure","Review Deleted!!");
    res.redirect(`/listings/${id}`)
 }