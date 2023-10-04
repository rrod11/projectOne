const { Spot, User, Review } = require("../db/models");
const userRightsAuthentication = async (req, _res, next) => {
  const spotId = req.params.spotId;
  const { user } = req;
  const err = {};
  err.message = "Spot couldn't be found";
  const target = await Spot.findOne({
    where: {
      id: spotId,
    },
  });
  if (user.id != target.id) {
    err.title = "Couldn't find a Spot with the specified id";
    err.status = 404;
    next(err);
  } else next();
};
const userHasRightsAuthentication = async (req, _res, next) => {
  const reviewId = req.params.reviewId;
  const { user } = req;
  const err = {};
  err.message = "Review couldn't be found";
  const target = await Review.findOne({
    where: {
      id: reviewId,
    },
  });
  if (user.id != target.id) {
    err.title = "Couldn't find a Review with the specified id";
    err.status = 404;
    next(err);
  } else next();
};

module.exports = userRightsAuthentication;
module.exports = userHasRightsAuthentication;
