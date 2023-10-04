const { Spot, User, Review, Booking } = require("../db/models");
const moment = require("moment");
const inProgress = async (req, _res, next) => {
  const bookingId = req.params.bookingId;
  const err = {};
  let tripped = false;
  err.message = "Bookings that have been started can't be deleted";
  err.errors = {};
  const booking = await Booking.findOne({
    where: {
      id: bookingId,
    },
  });
  const end = booking.endDate;
  const start = booking.startDate;
  const currStartDate = new Date(start);
  const currEndDate = new Date(end);
  if (
    moment(currEndDate).isAfter(moment()) &&
    moment(currStartDate).isBefore(moment())
  ) {
    err.status = 403;
    tripped = true;
  }
  if (tripped) {
    next(err);
  }
  next();
};

module.exports = inProgress;
