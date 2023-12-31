const { Spot, User, Review, Booking } = require("../db/models");
const moment = require("moment");
const {all}=require("../routes/api/spots");
const bookingUpdateConflict = async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const bookingId = req.params.bookingId;
  const err = {};
  let tripped = false;
  err.message = "Sorry, this spot is already booked for the specified dates";
  err.errors = {};

  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);

  const allBookings = await Booking.findAll({
    where: {
      id: bookingId,
    },
  });

  const spotId = allBookings[0].spotId;

  const bookings = await Booking.findAll({
    where: {
      spotId,
    },
  });
  if (bookings.length > 0) {
    for (let i = 0; i < bookings.length; i++) {
      const booking = bookings[i];
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);
      if (
        moment(newStartDate).isBetween(startDate, endDate) ||
        moment(newStartDate).isSame(startDate) ||
        moment(newStartDate).isSame(endDate)
      ) {
        err.status = 403;
        tripped = true;
        err.errors.startDate = "Start date conflicts with an existing booking";
      }
      if (
        moment(newEndDate).isBetween(startDate, endDate) ||
        moment(newEndDate).isSame(startDate) ||
        moment(newEndDate).isSame(endDate)
        ) {
          err.status = 403;
          tripped = true;
          err.errors.endDate = "End date conflicts with an existing booking";
        }
        if (
          moment(endDate).isBetween(newStartDate, newEndDate)
          ) {
            err.status = 403;
            tripped = true;
            err.errors.endDate = "Dates conflicts with an existing booking endDate";
          }
          if (
            moment(startDate).isBetween(newStartDate, newEndDate)
            ) {
              err.status = 403;
              tripped = true;
              err.errors.startDate = "Dates conflicts with an existing booking startDate";
            }
            if(bookings[i].id == allBookings[0].id) {
              tripped = false
            }
            if (tripped) {
              next(err);
            }
          }
  }
  next();
};

module.exports = bookingUpdateConflict;
