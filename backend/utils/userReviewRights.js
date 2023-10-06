const { Spot, User, Review } = require("../db/models");
const userReviewRightsAuthentication = async (req, _res, next) => {
  const reviewId = req.params.reviewId;
  const { user } = req;
  const userId = user.id
  const err = {};
  err.message = "Review couldn't be found";
  const target = await Review.findOne({
    where: {
      id: reviewId,
    },
  });

  if ( target == null) {
    err.title = "Couldn't find a Review with the specified id";
    err.status = 404;
    next(err);
  }
  if (  userId != target.userId) {
    err.title = "Couldn't find a Review with the specified id";
    err.status = 404;
    next(err);
  }
   next();
};

module.exports = userReviewRightsAuthentication;
