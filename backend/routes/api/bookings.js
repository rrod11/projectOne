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
// const userReviewRightsAuthentication = require("../../utils/userAuthentification");

const endDateCheck = require("../../utils/endDateCheck");

const notPastDue = require("../../utils/notPastDue");
const bookingUpdateConflict = require("../../utils/bookingUpdateConflictCheck");
const ownsBooking = require("../../utils/ownsBooking");
const inProgress = require("../../utils/inProgress");
const doesBookingExist=require("../../utils/doesBookingExist");
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
router.put(
  "/:bookingId",
  [requireAuth,doesBookingExist, ownsBooking, endDateCheck, bookingUpdateConflict, notPastDue],
  async (req, res) => {
    const { startDate, endDate } = req.body;
    const bookingId = req.params.bookingId;
    const targetBooking = await Booking.unscoped().findOne({
      where: {
        id: bookingId,
      },
    });
    // if(!targetBooking){

    // }
    await targetBooking.update({
      startDate,
      endDate,
    });
    res.json(targetBooking);
  }
);
router.delete(
  "/:bookingId",
  [requireAuth,doesBookingExist, ownsBooking, inProgress],
  async (req, res) => {
    const bookingId = req.params.bookingId;
    await Booking.destroy({
      where: {
        id: bookingId,
      },
    });
    res.json({
      message: "Successfully deleted",
    });
  }
);
module.exports = router;
