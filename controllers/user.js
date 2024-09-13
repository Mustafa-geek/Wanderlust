const User = require("../models/user.js");


module.exports.renderSignupForm =  (req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signup = async (req,res)=>{
    try{
        let{username,email,password} = req.body;
        const newUser = new User({email,username})  //Creating instance of User model. Note that the password is not stored directly here. Only email and username are being passed to create the user object. This is because passport-local-mongoose will handle password hashing and storing
        const save = await User.register(newUser,password) //saving in db  the user info
        console.log(save)

        req.login(save,(err)=>{     //once you have signuped there is no need to login so thsi req.login fills the req.user array
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
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs")
}


module.exports.login = async(req,res)=>{
    req.flash("message","Login Successful")
    let redirect = res.locals.redirectUrl || "/listings"   //agar redirectUrl empty hai toh /listings pe jao
   res.redirect(redirect)                  //this redirectUrl returns empty when we are tryg to login from home page                          
}


module.exports.logout = (req,res)=>{
    req.logout((err)=>{     //using the logout method for logging out of the website
       if(err){
           return next(err)
       }
       req.flash("message","You are Logged Out")
       res.redirect("/listings")
    })
   }