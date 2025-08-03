const allAmenities = {
  Bathroom: [
    "bath tub",
    "bathroom essentials",
    "bidet",
    "hair dryer",
    "hot water",
    "shampoo",
    "shower",
  ].sort(),

  Bedroom: [
    "bed linen",
    "hangers",
    "iron",
    "room-darkening blinds",
    "wardrobe",
  ].sort(),

  Kitchen: [
    "coffee maker",
    "dishes and cutlery",
    "fridge",
    "kitchen",
    "microwave",
    "toaster",
    "waste compactor",
  ].sort(),

  Entertainment: ["tv", "wifi", "ethernet cable"].sort(),

  HeatingCooling: ["air conditioning"].sort(),

  Outdoors: [
    "balcony",
    "beach view",
    "outdoor dining area",
    "swimming pool",
  ].sort(),

  Services: [
    "cleaning available during stay",
    "cleaning products",
    "laundry service",
    "long term stays",
  ].sort(),

  Safety: ["first aid kit"].sort(),

  Essentials: ["essentials"].sort(),

  Accessibility: ["lift", "free parking"].sort(),
};

function groupAmenitiesByCategory(selectedAmenities) {
  const grouped = {};

  for (let category in allAmenities) {
    grouped[category] = allAmenities[category].filter((amenity) =>
      selectedAmenities.includes(amenity)
    );
  }
  return grouped;
}

module.exports = { groupAmenitiesByCategory, allAmenities };
