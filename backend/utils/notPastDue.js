const { Spot, User, Review, Booking } = require("../db/models");
const moment = require("moment");
const notPastDue = async (req, _res, next) => {
  // const { startDate, endDate } = req.body;
  const bookingId = req.params.bookingId;
  const err = {};
  let tripped = false;
  err.message = "Past bookings can't be modified";
  err.errors = {};
  const booking = await Booking.findOne({
    where: {
      id: bookingId,
    },
  });
  const endDate = booking.endDate;
  const newEndDate = new Date(endDate);
  if (moment(newEndDate).isBefore(moment())) {
    err.status = 403;
    tripped = true;
  }
  if (tripped) {
    next(err);
  }
  next();
};

module.exports = notPastDue;
