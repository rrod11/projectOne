const { Review, User, ReviewImage } = require("../db/models");
const reviewVerification = (req, res, next) => {
  const { review, stars } = req.body;
  const err = {};
  err.errors = {};
  err.message = "Bad Request";
  let tripped = false;
  if (!review) {
    err.errors.review = "Review text is required";
    tripped = true;
  }
  if (!stars || isNaN(stars) || stars <= 0 || stars > 5) {
    err.errors.stars = "Stars must be an integer from 1 to 5";
    tripped = true;
  }
  if (tripped === true) {
    err.status = 400;
    next(err);
  } else {
    next();
  }
};
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
  console.log("HERES THE REVIEWS HERE:", target);
  if (target >= 10) {
    err.title = "Can't Have More than 10 Reviews";
    err.status = 403;
    next(err);
  } else next();
};

module.exports = reviewVerification;
module.exports = reviewLengthVerification;
