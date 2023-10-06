const {
  Spot,
  User,
  Review,
  Booking,
  ReviewImage,
  SpotImage,
} = require("../db/models");
const ownSpotImage = async (req, res, next) => {
  const { user } = req;
  const userId = user.id;
  const err = {}
  const imageId = req.params.imageId;
  const target = await SpotImage.findOne({
    where: {
      id: imageId,
    },
  });

  const spotId = target.spotId;
  const targetSpot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });
  if (targetSpot.ownerId != userId) {
    err.status= 403
      err.message = "Forbidden",
      next(err)
    };

  next();
};

module.exports = ownSpotImage;
