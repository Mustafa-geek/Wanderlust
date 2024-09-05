const mongoose = require("mongoose")
       //defining the schema of listing
const Schema = mongoose.Schema;
const Review = require("./review.js")

 const listingSchema = new Schema({
    title:{
        type:String,
        required:true

    },
   description:String,
   image:{
    type:String,
    default:"https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    set: (v) => v=== "" ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60": v,   //using ternary operator
   },
//  image: {
//        filename: String,
//        url: String
//    },
   price:Number,
   location:String,
   country:String, 
    
   //adding the review section in the schema of lisitngs in the db
   review:[
       {
              type:Schema.Types.ObjectId,
              ref:"Review" //Review model from review.js
       },
   ],


})


// Post Mongoose Middleware
//listing ku delete kare toh uske andar ke reviews bhi deltet hona isliye likhre apan ye middleware ...nhitoh 
//kya hora tha boletoh listings aur reviews dono alg collections hai na db mei ...toh ek ku delte kare toh dusra rehra tha waisich

listingSchema.post("findOneAndDelete", async(listing) =>{//jo listing ku tum delte karna chahre wo
       if(listing){
              await Review.deleteMany({_id : {$in: listing.review}})//it deletes all reviews associated with that listing by finding and deleting reviews whose _id is in the listing.review array.
       }

})


const  Listing = mongoose.model("Listing",listingSchema);
       //model                  collection
module.exports = Listing; // exporting to app.js
