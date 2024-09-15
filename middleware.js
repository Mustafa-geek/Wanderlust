const Listing = require("./models/listing.js")   //schema is defined
const ExpressError = require("./utils/ExpressError.js")
const { listingSchema } = require("./schema.js")  //joi is required
const {reviewSchema} = require("./schema.js")  //joi is required
const Review = require("./models/review.js")   //schema is defined


module.exports.validateListing = (req,res,next)=>{  //using joi (for error handling)
    let {error} = listingSchema.validate(req.body)
    if(error){
     throw new ExpressError(400,error)
    }
    else{
        next();
    }
}


module.exports.validatereview = (req,res,next)=>{  //using joi (for error handling)
    let {error} = reviewSchema.validate(req.body)
    if(error){
     throw new ExpressError(400,error)
    }
    else{
        next();
    }
}


module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){    //agar user logged in nhi hai toh
        // console.log(req.user)
        //console.log(req)
        req.session.redirectUrl = req.originalUrl; //original url save karalere jahan apne ku user ku redirect karna hai
        req.flash("error","You Must Be Logged In")
        return res.redirect("/login")
   }
   next();
}


module.exports.saveRedirectUrl =(req,res,next)=>{
    if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl  //passport mei ek prob hai ki jaisa hi authenticate karta wahan uppar... unhe session kku reset kardeta
}                                                        //isliye ab locals use karre taaki apan usku  jagah se accessible  karsakte hai midlleware ke through  
   next()
}                                                  
 

module.exports.isOwner = async (req, res, next) => {   //error handling if someone manipulates edit req from hopscoth
     let { id } = req.params;
     let listing = await Listing.findById(id) //pehle id nikal lere
     if (!listing.owner.equals(res.locals.currUser._id)) { 
          req.flash("error", "You are not the owner of this Listing")
          return res.redirect(`/listings/${id}`)
    }
    
    next()
}


module.exports.isreviewAuthor = async (req, res, next) => {   //error handling if someone manipulates edit,delte from hopscoth for reviews
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId) //pehle id nikal lere
    if (!review.author.equals(res.locals.currUser._id)) { 
         req.flash("error", "You are not the owner of this Review")
         return res.redirect(`/listings/${id}`)
   }
   
   next()
}