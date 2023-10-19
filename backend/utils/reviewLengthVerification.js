const { Review, User, ReviewImage } = require("../db/models");
const reviewLengthVerification = async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const { user } = req;
  const err = {};
  err.message = "Maximum number of images for this resource was reached";
  const target = await ReviewImage.count({
    where: {
      reviewId: reviewId,
    },
  });
  if (target >= 10) {
    err.title = "Can't Have More than 10 Reviews";
    err.status = 403;
    next(err);
  } else next();
};

module.exports = reviewLengthVerification;
