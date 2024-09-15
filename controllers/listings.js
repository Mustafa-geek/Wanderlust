const Listing = require("../models/listing.js")   //schema is defined



module.exports.index = async (req,res) =>{   //index route
    let ans = await Listing.find({})
     res.render("listings/index.ejs",{ans})
}

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs")
}

module.exports.showListing = async (req,res)=>{ //jo lstng pe click kare uski puri info dena id pakadke (show route)
    let {id} = req.params;

    let ans = await Listing.findById(id)
    .populate({path:"review",    //review mei ke author ku bhi populate karo (idhar review refers to schema of listing)
         populate:{
              path:'author'
         },
    })
    .populate("owner");  //showing all info of the properties of the listing
    if(!ans){   //agar jo listing dhondhre wo nhi exist karti
     req.flash("failure","Listing you requested for does not exist")
     res.redirect("/listings")
    }
    res.render("listings/show.ejs",{ans})
    // console.log(ans)
}


module.exports.createListing = async (req,res,next)=>{
    //let{title,description,image,place,}=req.body
    //let ans = req.body.listing

    // if(!req.body.listing){        //agar listing ka data send kare so sahi nhi kare toh apan defined custom err send karre
    //     throw new ExpressError(400,"Send Valid Data For listing")
    // }

    let url = req.file.path;   //jab file bhejre backend ku usemi se extract karlere ye
    let filename = req.file.filename

    const ans = new Listing(req.body.listing) //creating an instance
    ans.owner = req.user._id; //jo new listing ka owner unhe banta jo currently logged in hai toh uski id ghusaare ismei
    ans.image = {url,filename}// jo new listing banare usmei image ke scchema ke cheeza ghusaare
    await ans.save()
    req.flash("message","New Listing is  Created!!");
    res.redirect("/listings")
}


module.exports.renderEditForm = async (req,res) =>{
    let {id} = req.params;
    const ans = await Listing.findById(id)
    if(!ans){
        req.flash("error","Listing you requested for does not exist")
        res.redirect("/listings")
    }

   let blur =  ans.image.url.replace("/upload","/upload/w_250")  //using cloudinary ..wo img ku blur kardere
    res.render("listings/edit.ejs",{ans,blur})
}


module.exports.updateListing = async(req,res) =>{
     
    // if(!req.body.listing){        //agar listing ka data send kare so sahi nhi kare toh apan defined custom err send karre
    //     throw new ExpressError(400,"Send Valid Data For listing")
    // }  
    let {id} = req.params
    let tp = await Listing.findByIdAndUpdate(id,{...req.body.listing})  //jo bhi nayi req.body aayi na usku wo id waale cheez se update kardo
    // console.log(req.body.listing)

    if(typeof req.file !== "undefined"){  //cuz it is not compulsory ke user image ku update karta ya nhi 
    let url = req.file.path;   //jab file bhejre backend ku usemi se extract karlere ye
    let filename = req.file.filename
    tp.image = {url,filename}
    await tp.save()
    }

    req.flash("message","Your Listing has been Edited!!");
    res.redirect(`/listings/${id}`)
}




module.exports.destroyListing =  async(req,res)=>{ //triggers middleware in listing.js
    let {id} = req.params;
    let ans = await Listing.findByIdAndDelete(id);
    console.log(ans) //deleted listing
    req.flash("failure","Listing is  Deleted!!");
    res.redirect("/listings")
}