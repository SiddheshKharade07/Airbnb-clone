const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema"); //joi object for validation
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        // redirectUrl save
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req, res, next) =>  {
    let {id} = req.params;
    let listing  = await Listing.findById(id);
    if(res.locals.currUser && !listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have Permission to edit!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

// server side form validation middleware for listings
// you can see its declaration and definition in schema.js
module.exports.validateListing = async(req, res, next) => {
    let {error} = listingSchema.validate(req.body);
        if(error) {
            let errMsg = error.details.map((el) => el.message).join(",");
            throw new ExpressError(400, errMsg);
        }
        next();
}

// server side form validation function for reviews
// you can see its declaration and definition in schema.js
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
};

module.exports.isReviewAuthor = async(req, res, next) =>  {
    let { id, reviewId } = req.params;
    let review  = await Review.findById(reviewId);
    if((res.locals.currUser && !review.author.equals(res.locals.currUser._id)) || typeof(res.locals.currUser) === "undefined") {
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
