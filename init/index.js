const mongoose = require("mongoose")
const ourData = require("./data.js")          //all database
const Listing = require("../models/listing.js")  //schema defined

main().then(() => {
    console.log("DB is connected")
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}

const initDb = async () => {
    await Listing.deleteMany({}); //deletes all the previous docs if present any from the db
    ourData.data = ourData.data.map((obj)=> ({...obj,owner:'66e1fc502fcc7c9888e63349'})) //returns a new array which includes all the properties of listing obj with added owner property
    await Listing.insertMany(ourData.data)                            //aur sab listings jo initialise hore sabku yaich owner ki id milri
    console.log("Db has been initialised")                            //jo naye listings hai uska owner listing save karte waqt jo id se login karewe rehte na unhe rehta(refer routes/listings/creating new listing)
}

 initDb()   //calling function

