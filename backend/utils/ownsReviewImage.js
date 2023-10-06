const { Spot, User, Review, Booking, ReviewImage } = require("../db/models");
const ownsReviewImage = async (req, res, next) => {
  const { user } = req;
  const userId = user.id;
  const imageId = req.params.imageId;
  const target = await ReviewImage.findOne({
    where: {
      id: imageId,
    },
  });
  if(target == null){
     res.status(404).json({
      message: "Review Image couldn't be found",
    });
  }
  const reviewId = target.reviewId;
  const targetReview = await Review.findOne({
    where: {
      id: reviewId,
    },
  });
  const reviewOwner = targetReview.userId;
  if (reviewOwner != userId) {
    res.status(404).json({
      message: "Review Image couldn't be found",
    });
  }
  next();
};

module.exports = ownsReviewImage;
