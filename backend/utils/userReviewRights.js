const { Spot, User, Review } = require("../db/models");
const userReviewRightsAuthentication = async (req, _res, next) => {
  const reviewId = req.params.reviewId;
  const { user } = req;
  const userId = user.id
  const err = {};
  err.message = "Forbidden";
  const target = await Review.findOne({
    where: {
      id: reviewId,
    },
  });


  if (  userId != target.userId) {
    err.title = "Unauthorized Permission";
    err.status = 403;
    next(err);
  }
   next();
};

module.exports = userReviewRightsAuthentication;
