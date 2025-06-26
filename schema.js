const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.number().required(),
        country: Joi.string().required(),
        image: Joi.string().allow("", null),
        category: Joi.string().valid("mountains", "rooms", "farms", "arctic", "beach", "iconic cities", "amazing pools", "camping", "domes", "boats").required(),
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});

// geometry: Joi.object({
//             type: Joi.string().valid("Point").required(),
//             coordinates: Joi.array().items(Joi.number()).length(2).required(),
//         }).required(),