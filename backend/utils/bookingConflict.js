const { Spot, User, Review, Booking } = require("../db/models");
const moment = require("moment");
const bookingConflict = async (req, _res, next) => {
  const { startDate, endDate } = req.body;
  const spotId = req.params.spotId;
  const err = {};
  let tripped = false;
  err.message = "Sorry, this spot is already booked for the specified dates";
  err.errors = {};

  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);

  const allBookings = await Booking.findAll({
    where: {
      spotId,
    },
  });

  if (allBookings.length > 0) {
    for (let i = 0; i < allBookings.length; i++) {
      const booking = allBookings[i];
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);
      if (
        moment(newStartDate).isBetween(startDate, endDate) ||
        moment(newStartDate).isSame(startDate) ||
        moment(newStartDate).isSame(endDate)
      ) {
        err.status = 400;
        tripped = true;
        err.errors.startDate = "Start date conflicts with an existing booking";
      }
      if (
        moment(newEndDate).isBetween(startDate, endDate) ||
        moment(newEndDate).isSame(startDate) ||
        moment(newEndDate).isSame(endDate)
      ) {
        err.status = 400;
        tripped = true;
        err.errors.endDate = "End date conflicts with an existing booking";
      }
      if (tripped) {
        next(err);
      }
    }
  }
  next();
};

module.exports = bookingConflict;
