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
// passport -local-Mongoose by default  defines username,hash,salt,

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User',userSchema)