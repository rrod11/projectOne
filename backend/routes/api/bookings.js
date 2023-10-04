const express = require("express");
const { requireAuth } = require("../../utils/auth");
const {
  Review,
  User,
  Spot,
  ReviewImage,
  SpotImage,
  Booking,
} = require("../../db/models");
// const userHasRightsAuthentication = require("../../utils/userAuthentification");
// const reviewLengthVerification = require("../../utils/reviewLengthVerification");
// const userReviewRightsAuthentication = require("../../utils/userAuthentification");
// const reviewVerification = require("../../utils/reviewVerification");
const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const userId = user.id;
  const allBookings = await Booking.unscoped().findAll({
    where: {
      userId,
    },
    include: {
      model: Spot,
      attributes: {
        exclude: ["description", "createdAt", "updatedAt"],
      },
      include: {
        model: SpotImage,
        attributes: ["url"],
      },
    },
  });
  const bookingsJSON = allBookings.map((ele) => ele.toJSON());

  for (let i = 0; i < bookingsJSON.length; i++) {
    if (bookingsJSON[i].Spot.SpotImages.length > 0) {
      bookingsJSON[i].Spot.previewImage =
        bookingsJSON[i].Spot.SpotImages[0].url;
      delete bookingsJSON[i].Spot.SpotImages;
    }
  }
  res.json({ Bookings: bookingsJSON });
});
module.exports = router;
