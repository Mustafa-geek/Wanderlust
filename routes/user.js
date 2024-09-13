//used for authenication using passport
const express = require("express")
const router = express.Router(); 
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js")

//signup matlab naya acc banana
router.get("/signup",userController.renderSignupForm)

router.post("/signup",wrapAsync(userController.signup))


//ROutes for login page
router.get("/login",userController.renderLoginForm)

router.post("/login",
    saveRedirectUrl,            //passing middleware from middleware.js
     passport.authenticate("local" , {   //passing it as a middleware
        failureRedirect:"/login",
        failureFlash:true,
}),
userController.login)


//logout user
router.get("/logout",userController.logout)


module.exports = router