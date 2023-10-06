const { Spot, User, Review } = require("../db/models");
const userHasRightsAuthentication = async (req, _res, next) => {
  const reviewId = req.params.reviewId;
  const { user } = req;
  const err = {};
  err.message = "Forbidden";
  const target = await Review.findOne({
    where: {
      id: reviewId,
    },
  });

  if ( target == null || user.id != target.userId) {
    err.title = "Unauthorized Permissions";
    err.status = 403;
    next(err);
  } else next();
};

module.exports = userHasRightsAuthentication;
