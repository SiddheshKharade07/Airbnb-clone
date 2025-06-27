const Listing = require("../models/listing");

module.exports.trending = async(req, res) => {
    res.redirect("/listings");
}

module.exports.rooms = async(req, res) => {
    let allListings = await Listing.find({category: "rooms"});
    res.render("listings/index", {allListings});
}

module.exports.mountains = async(req, res) => {
    let allListings = await Listing.find({category: "mountains"});
    res.render("listings/index", {allListings});
}

module.exports.farms = async(req, res) => {
    let allListings = await Listing.find({category: "farms"});
    res.render("listings/index", {allListings});
}

module.exports.arctics = async(req, res) => {
    let allListings = await Listing.find({category: "arctic"});
    res.render("listings/index", {allListings});
}

module.exports.beaches = async(req, res) => {
    let allListings = await Listing.find({category: "beach"});
    res.render("listings/index", {allListings});
}

module.exports.cities = async(req, res) => {
    let allListings = await Listing.find({category: "iconic cities"});
    res.render("listings/index", {allListings});
}

module.exports.pools = async(req, res) => {
    let allListings = await Listing.find({category: "amazing pools"});
    res.render("listings/index", {allListings});
}

module.exports.campings = async(req, res) => {
    let allListings = await Listing.find({category: "camping"});
    res.render("listings/index", {allListings});
}

module.exports.domes = async(req, res) => {
    let allListings = await Listing.find({category: "domes"});
    res.render("listings/index", {allListings});
}

module.exports.boats = async(req, res) => {
    let allListings = await Listing.find({category: "boats"});
    res.render("listings/index", {allListings});
}