const express = require("express");
const app = express();
const ExpressError = require("./ExpressError")


app.get("/error", (req,res)=>{
    abcd=abcd  //error
    console.log('workingsssss')
});

//Custom error handling using err class

app.use("/bank",(req,res,next)=>{     // /bank?key=give
    let {key} = req.query;
    if(key == "give"){
        next();
    }
    throw new ExpressError(401,"Access Denied!!")
})

app.get("/bank",(req,res)=>{
    res.send("Welcome to the Bank Services")
})

// app.use((err,req,res,next)=>{
//     console.log("ERROR")      //Custom error Handling
//     next(err);                //next(err)= express default err handler.....just next() defined goes to non-error handling middleware
// })

app.use((err,req,res,next)=>{
    let {status=500,message="Some Error Occured BRO"} = err;
    res.status(status).send(message) 
})

app.listen(8080,()=>{
    console.log("Server is listening on port 8080")
})