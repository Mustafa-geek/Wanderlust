const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError.js")
const session = require("express-session")
const flash = require("connect-flash")

const Listings = require("./routes/listing.js"); //all listings are kept
const Reviews = require("./routes/review.js") //all reviews are kept

main().then(()=>{
    console.log("DB is connected")
})
.catch(err => console.log(err));

const sessions = { 
    secret: "secret code",    //session using as a middleware
     resave: false,
    saveUninitialized: true,
    cookie: {
        expires:Date.now() * 7 * 24 * 60 * 60 *1000,
        maxAge :  7 * 24 * 60 * 60 *1000,
        httpOnly:true,
    },
}
app.use(session(sessions))
app.use(flash())
app.use((req,res,next)=>{        //using the middleware for flash
    res.locals.messagaan = req.flash("message"); //message is used as key  in listing/review.js and messagan is transmitted to boilerplate...flash.ejs
    res.locals.failures = req.flash("failure");  //same
    next();  //routes ke paas waapis aajati phr baat
})


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate)
app.use(express.static(path.join(__dirname,"/public")))  ///serving static files in public

app.listen("8080", () => {
    console.log("server is listening on port 8080")
})

app.get("/",(req,res) =>{
    res.send("working")
})
 

app.use("/listings",Listings)  //line 13
app.use("/listings/:id/reviews",Reviews)//line 14


app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!")) //ExpressError.js is used here
})


// ERROR HANDLING MIDDLEWARE for that expresserror.js in utils
app.use((err,req,res,next) =>{
    let {statusCode=500, message="Something went wrong" } = err; //giving our own wish statuscode and message
    res.status(statusCode).render("listings/error.ejs",{message})
    // res.status(statusCode).send(message)
})
