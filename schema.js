const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().required(),
    country: Joi.string().required(),
    image: Joi.object({
      url: Joi.string().required(),
      filename: Joi.string().allow("", null),
    }).allow(null),
    category: Joi.string()
      .valid(
        "rooms",
        "mountains",
        "farms",
        "arctics",
        "beaches",
        "cities",
        "pools",
        "campings",
        "domes",
        "boats"
      )
      .required(),
    amenities: Joi.array()
      .items(
        Joi.string().valid(
          "hair dryer",
          "cleaning products",
          "shampoo",
          "bath tub",
          "bidet",
          "shower",
          "hot water",
          "essentials",
          "hangers",
          "bed linen",
          "room-darkening blinds",
          "iron",
          "tv",
          "wifi",
          "ethernet cable",
          "air conditioning",
          "ceiling fan",
          "first aid kit",
          "fridge",
          "microwave",
          "dishes and cutlery",
          "coffee maker",
          "toaster",
          "kitchen",
          "balcony",
          "outdoor dining area",
          "swimming pool",
          "lift",
          "cleaning available during stay",
          "free parking",
          "laundry service",
          "long term stays",
          "bathroom essentials",
          "beach view",
          "wardrobe",
          "waste compactor"
        )
      )
      .optional(),
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
