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
    await Listing.insertMany(ourData.data)
    console.log("Db has been initialised")
}

 initDb()   //calling function

