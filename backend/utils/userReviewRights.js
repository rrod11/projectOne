const { Spot, User, Review } = require("../db/models");
const userReviewRightsAuthentication = async (req, _res, next) => {
  const reviewId = req.params.reviewId;
  const { user } = req;
  const err = {};
  err.message = "Review couldn't be found";
  const target = await Review.findOne({
    where: {
      id: reviewId,
    },
  });
  if (user.id != target.userId) {
    err.title = "Couldn't find a Review with the specified id";
    err.status = 404;
    next(err);
  } else next();
};

module.exports = userReviewRightsAuthentication;
