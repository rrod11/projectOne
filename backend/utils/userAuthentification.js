const { Spot, User, Review } = require("../db/models");
const userRightsAuthentication = async (req, _res, next) => {
  const spotId = req.params.spotId;
  const { user } = req;
  const err = {};
  err.errors = {}
  err.errors.message = "Forbidden";
  const target = await Spot.findOne({
    where: {
      id: spotId,
    },
  });

  if ( user.id != target.ownerId) {
    err.title = "Wrong Permissions";
    err.status = 403;
    next(err);
  }
  next();
};

module.exports = userRightsAuthentication;
