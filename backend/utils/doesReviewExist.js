const { Spot, User, Review } = require("../db/models");
const doesReviewExist = async (req, _res, next) => {
  const reviewId = req.params.reviewId;
  const { user } = req;
  const err = {};
  err.errors = {}
  err.errors.message = "Review couldn't be found";
  const target = await Review.findOne({
    where: {
      id: reviewId,
    },
  });

  if ( !target) {
    err.title = "Could not find a Review with that Id";
    err.status = 404;
    next(err);
  }
  next();
};

module.exports = doesReviewExist;
