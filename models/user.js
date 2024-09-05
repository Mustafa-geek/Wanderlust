const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

//schema of user for authentication


const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    }
})

//by default passport defines username,hash,salt,