const express = require("express")
const app = express();
const session = require("express-session")
const flash = require("connect-flash")
const ejsMate = require("ejs-mate")
const path = require("path")


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.engine("ejs",ejsMate)


const sessionservices = { 
    secret: "apun ka secret code",    //session using as a middleware
     resave: false,
      saveUninitialized: true 
}
app.use(session(sessionservices))
app.use(flash())

app.listen(3000, () => {
    console.log("server is working");
})

app.get("/", (req, res) => {
    res.send("working")
})

app.get("/register",(req,res)=>{
    let {ans="khudi se ek default naame dere yahan"} = req.query;  //we need to give the query string as ?ans=blah otherwise default value leleta
    console.log(req.session)  //a cookie always exists in req.session object 
    req.session.name = ans;
    //res.send(ans);
    req.flash("success","flashing smthng")
    res.redirect("/hello")
})

app.get("/hello",(req,res)=>{
    res.locals.messagaan = req.flash('success')  //it will be rendered to page.ejs
 res.render("page.ejs",{name:req.session.name,})

   //that req.session.name can be used in this route as well
    //res.send(`hello ${req.session.name}`)
})




// app.get("/count",(req,res)=>{;
//      req.session.count
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
//     res.send(`the count of requests are ${req.session.count} times`)
// })







































