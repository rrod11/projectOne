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
  if (user.id != target.id || target.id == null) {
    err.title = "Couldn't find a Spot with the specified id";
    err.status = 404;
    next(err);
  }
  next();
};

module.exports = userRightsAuthentication;
