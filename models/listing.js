const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  category: {
    type: String,
    enum: ["mountains", "rooms", "farms", "arctic", "beach", "iconic cities", "amazing pools", "camping", "domes", "boats"],
    default: "rooms",
  },
  amenities: {
  type: [String],
  enum: [
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
    "waste compactor",
  ],
  default: [],
},
});

// This is an middleware for deleting reviews from database of deleted listing
listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

// add category
// amenities: {
//   type: String,
//   enum: [bath, hair dryer, cleaning projects, shampoo, body soap, bidet, shower, hot water, essentials, hangers, bed linen, room-darkening blinds, iron, tv, wifi, ethernet cable, air conditioning, ceiling fan, first aid kit, fridge, microwave, dishes and cutlery, coffee maker, toaster, dining table, balcony, outdoor dining area, swimming pool, hot tub, lift, cleaning available during stay, free parking, laundry service]
// }

