//used for authenication using passport
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(userController.renderSignupForm) //signup matlab naya acc banana
  .post(wrapAsync(userController.signup));



router
  .route("/login")
  .get(userController.renderLoginForm) //ROutes for login page
  .post(
    saveRedirectUrl, //passing middleware from middleware.js
    passport.authenticate("local", {
      //passing it as a middleware
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );



//logout user
router.get("/logout", userController.logout);

module.exports = router;
