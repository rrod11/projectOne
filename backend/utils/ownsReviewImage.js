const { Spot, User, Review, Booking, ReviewImage } = require("../db/models");
const ownsReviewImage = async (req, res, next) => {
  const { user } = req;
  const userId = user.id;
  const err = {}
  const imageId = req.params.imageId;
  const target = await ReviewImage.findOne({
    where: {
      id: imageId,
    },
  });

  const reviewId = target.reviewId;
  const targetReview = await Review.findOne({
    where: {
      id: reviewId,
    },
  });
  const reviewOwner = targetReview.userId;
  if (reviewOwner != userId) {
    err.status = 404
      err.message = "Forbidden",
      next(err)
  }
  next();
};

module.exports = ownsReviewImage;
