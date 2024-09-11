const express = require("express")
const router = express.Router();
const Listing = require("../models/listing.js")   //schema is defined
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const {listingSchema} = require("../schema.js")  //joi is required
const {isLoggedIn} = require("../middleware.js")

const validateListing = (req,res,next)=>{  //using joi (for error handling)
    let {error} = listingSchema.validate(req.body)
    if(error){
     throw new ExpressError(400,error)
    }
    else{
        next();
    }
}

router.get("/",wrapAsync( async (req,res) =>{   //index route
    let ans = await Listing.find({})
     res.render("listings/index.ejs",{ans})
}))
  
//put this route above listings/:id otherwise /new will be considered as :id
router.get("/new",isLoggedIn,(req,res)=>{
     //
     res.render("listings/new.ejs")
})
 
router.get("/:id",wrapAsync(async (req,res)=>{ //jo lstng pe click kare uski puri info dena id pakadke (show route)
     let {id} = req.params;
     let ans = await Listing.findById(id).populate("review");
     if(!ans){   //agar jo listing dhondhre wo nhi exist karti
      req.flash("failure","Listing you requested for does not exist")
      res.redirect("/listings")
     }
     res.render("listings/show.ejs",{ans})
}))
 
 
//Saving the filled form as a listing in the db 
router.post("/",validateListing ,isLoggedIn, wrapAsync(async (req,res,next)=>{
     //let{title,description,image,place,}=req.body
     //let ans = req.body.listing
 
     // if(!req.body.listing){        //agar listing ka data send kare so sahi nhi kare toh apan defined custom err send karre
     //     throw new ExpressError(400,"Send Valid Data For listing")
     // }
 
     const ans = new Listing(req.body.listing) //creating an instance
     await ans.save()
     req.flash("message","New Listing is  Created!!");
     res.redirect("/listings")
}));
 

//EDIT Route
router.get("/:id/edit",isLoggedIn,wrapAsync( async (req,res) =>{
     let {id} = req.params;
     const ans = await Listing.findById(id)
     res.render("listings/edit.ejs",{ans})
}))
 

//after clking edit btn, changes are made
router.put("/:id" ,validateListing, isLoggedIn, wrapAsync(async(req,res) =>{
     
     // if(!req.body.listing){        //agar listing ka data send kare so sahi nhi kare toh apan defined custom err send karre
     //     throw new ExpressError(400,"Send Valid Data For listing")
     // }
 
     let {id} = req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing})  //jo bhi nayi req.body aayi na usku wo id waale cheez se update kardo
     // console.log(req.body.listing)
     req.flash("message","Your Listing has been Edited!!");
     res.redirect(`/listings/${id}`)
}))
 
//Delte ROute
router.delete("/:id",isLoggedIn,wrapAsync( async(req,res)=>{ //triggers middleware in listing.js
     let {id} = req.params;
     let ans = await Listing.findByIdAndDelete(id);
     console.log(ans) //deleted listing
     req.flash("failure","Listing is  Deleted!!");
     res.redirect("/listings")
}));
 
 

module.exports = router