const { Spot, User, Review, Booking } = require("../db/models");
const doesBookingExist = async (req, _res, next) => {
  const bookingId = req.params.bookingId;
  const { user } = req;
  const err = {};
  err.errors = {}
  err.errors.message = "Booking couldn't be found";
  const target = await Booking.findOne({
    where: {
      id: bookingId,
    },
  });

  if ( !target) {
    err.title = "Could not find a Booking with that Id";
    err.status = 404;
    next(err);
  }
  next();
};

module.exports = doesBookingExist;
