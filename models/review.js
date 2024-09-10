const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//Schema of reviews is defined

const reviewSchema = new Schema({
    comment:String,

    rating:{
    type:Number,
    min:1,
    max:5
    },
   
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("Review",reviewSchema)


//"Review": The first argument is the name of the model. In this case, it's "Review". Mongoose automatically creates a collection in MongoDB with the plural version of this name (e.g., "reviews").
//reviewSchema: The second argument is the schema that defines the structure of documents in the collection. The reviewSchema specifies what fields the "reviews" collection will have and any rules for those fields (like types and validations).