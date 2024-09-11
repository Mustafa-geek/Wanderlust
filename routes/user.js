//used for authenication using passport
const express = require("express")
const router = express.Router(); 
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport")

//signup matlab naya acc banana
router.get("/signup", (req,res)=>{
    res.render("users/signup.ejs")
})

router.post("/signup",wrapAsync(async (req,res)=>{
    try{
        let{username,email,password} = req.body;
        const newUser = new User({email,username})  //Creating instance of User model. Note that the password is not stored directly here. Only email and username are being passed to create the user object. This is because passport-local-mongoose will handle password hashing and storing
        const save = await User.register(newUser,password) //saving in db  the user info
        console.log(save)

        req.login(save,(err)=>{     //once you have signuped there is no need to login
            if(err){
                return next(err)
            }
            req.flash("message","You are Logged In")
            res.redirect("/listings")
        })
    }
    catch(e){
        req.flash("error",e.message)
        console.log(e.message)
        res.redirect("/signup");
    }
}))

//ROutes for login page

router.get("/login",(req,res)=>{
    res.render("users/login.ejs")
})

router.post("/login",
     passport.authenticate("local" , {   //passing it as a middleware
        failureRedirect:"/login",
        failureFlash:true,
}),
async(req,res)=>{
    req.flash("message","Login Successful")
   res.redirect("/listings")
})


router.get("/logout",(req,res)=>{
 req.logout((err)=>{     //using the logout method for logging out of the website
    if(err){
        return next(err)
    }
    req.flash("message","You are Logged Out")
    res.redirect("/listings")
 })
})


module.exports = router