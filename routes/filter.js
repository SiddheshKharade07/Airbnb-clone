const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const filterCategories = require("../utils/filterCategories");

router.get("/:category", wrapAsync(async (req, res) => {
    const { category } = req.params;

    if (!filterCategories.includes(category)) {
        req.flash("error", "no such filters");
        return res.redirect("/listings");
    }

    const listings = await Listing.find({ category });

    res.render("listings/index", {allListings: listings,});
}));

module.exports = router;