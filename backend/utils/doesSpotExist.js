const { Spot, User, Review } = require("../db/models");
const doesSpotExist = async (req, _res, next) => {
  const spotId = req.params.spotId;
  const { user } = req;
  const err = {};
  err.errors = {}
  err.errors.message = "Spot couldn't be found";
  const target = await Spot.findOne({
    where: {
      id: spotId,
    },
  });

  if (!target) {
    err.title = "Could not find a Spot with that Id";
    err.status = 404;
    next(err);
  }
  next();
};

module.exports = doesSpotExist;
