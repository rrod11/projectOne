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
  console.log("WHATS MY VALUE:", user);
  const userId = user.id;
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
  const imageOwner = targetSpot.ownerId;
  if (imageOwner != userId) {
    res.status(404).json({
      message: "Spot Image couldn't be found",
    });
  }
  next();
};

module.exports = ownSpotImage;
