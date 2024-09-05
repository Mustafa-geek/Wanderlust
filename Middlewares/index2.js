const express = require("express");
const app = express();
// app.use mtlb middleware
// app.use((req,res,next)=>{
//     console.log("I am a Middleware")
//     next();
// })
//agar next() nhi likhe toh wo route pe khali load hote rehta page lekin middleware invoke hojata isliye console mei I am middleware batara
//middleware ku apn shru mei hi likhte kaiku boletoh agar aakhri mei likhe toh route ka pehle hi req,res server hojata kaunsi bhi app.get se fulfill hojaati , ek baar wo hojaane ke baad middleware kch nhi krsakta
// app.use("/",(req,res,next)) == app.use((req,res,next)) ye dono same hai isliye next() likhna zaruri rehta warna load pe atak jaata page 


app.use("/api",(req,res,next)=>{
    let {token} = req.query;
    if( token === "giveaccess"){
        next();
    }
    else{
        res.send("Wrong token Inserted")
    }
})
 
app.get("/",(req,res)=>{
    res.send("working")
})

app.get("/api",(req,res)=>{
    res.send("data")
})

app.listen(8080,()=>{
    console.log("Server is listening on port 8080")
})