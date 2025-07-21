const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const {allAmenities, groupAmenitiesByCategory} = require("../utils/amenities");
const { cloudinary } = require("../cloudConfig");
const fs = require("fs");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", {allListings});
}

module.exports.renderNewForm = (req, res) => {
    const amenities = Object.values(allAmenities).flat();
    console.log(amenities);
    res.render("listings/new.ejs", {amenities});
}

module.exports.showListing = async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if(!listing) {
        req.flash("error", "Listing you requested for does not exists");
        res.redirect("/listings");
    } else {
        const amenities = groupAmenitiesByCategory(listing.amenities);
        res.render("listings/show.ejs", {listing, amenities});
    }
}

module.exports.createListing = async (req, res) => {
    const response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send();

    if (!response.body?.features?.[0]?.geometry) {
        req.flash("error", "Invalid Location");
        return res.redirect("/listings/new");
    }

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.geometry = response.body.features[0].geometry;

    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "wanderlust_DEV",
        });

        newListing.image = {
        url: result.secure_url,
        filename: result.public_id,
        };

        fs.unlinkSync(req.file.path);
    }

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};


module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you requested for Does not Exist!");
        return res.redirect("/listings");
    }

    const amenities = Object.values(allAmenities).flat();
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", {listing, originalImageUrl, amenities});
}

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    const geoResponse = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send();

    if (!geoResponse.body?.features?.[0]?.geometry) {
        req.flash("error", "Invalid Location");
        return res.redirect(`/listings/${id}/edit`);
    }

    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    // Update basic fields + geometry
    listing.set({
        ...req.body.listing,
        geometry: geoResponse.body.features[0].geometry
    });

    // If a new file is uploaded, update image info
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "wanderlust_DEV"
        });

        listing.image = {
            url: result.secure_url,
            filename: result.public_id
        };

        fs.unlinkSync(req.file.path); // clean up local file
    }

    await listing.save();
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
}