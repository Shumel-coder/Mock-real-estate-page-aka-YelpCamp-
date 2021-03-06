const Property = require('../models/property');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const property = await Property.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    property.reviews.push(review);
    await review.save();
    await property.save();
    req.flash('success', 'Submitted review!');
    res.redirect(`/properties/${property._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Property.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/properties/${id}`);
}