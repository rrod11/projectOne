const { Spot, User } = require("../db/models");
const notOwner = async (req, res, next) => {
  const { user } = req;
  const userId = user.id;
  const spotId = req.params.spotId;
  const err = {};
  const theSpot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });
  if (!theSpot) {
    err.status = 404;
    (err.message = "Spot couldn't be found"), next(err);
  }

  if (theSpot.ownerId == userId) {
    err.status = 400;
    err.message = "You cannot create a review for yourself";
    next(err);
  } else {
    next();
  }
};

module.exports = notOwner;
