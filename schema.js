const Joi = require("joi")

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        country: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("",null),
        
}).required()
})


//while sending a post request from hoppscoth in the req.body , earlier if we missed something
//still it was adding in the db and we were able to see it in our ui
//but now, whtevr is required it must be there other Joi will detect it & throw error
//server-side errors are handled

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),    //coming from show.ejs that review obj
        comment:Joi.string().required()

    }).required()
})