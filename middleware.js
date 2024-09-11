module.exports.isLoggedIn = (req ,res , next)=>{
    if(!req.isAuthenticated()){    //without login now allowing to create a new listing
        // console.log(req.user)
        req.flash("error","You Must Be Logged In")
        return res.redirect("/login")
   }
   next();
}