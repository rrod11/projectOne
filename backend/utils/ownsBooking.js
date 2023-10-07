const { Spot, User, Review, Booking } = require("../db/models");
const ownsBooking = async (req, res, next) => {
  const { user } = req;
  const userId = user.id;
  const err = {}
  const bookingId = req.params.bookingId;
  const target = await Booking.findOne({
    where: {
      id: bookingId,
    },
    include: {
      model: Spot,
      attributes: ["ownerId"],
    },
  });
  if ( target.userId != userId ) {
    err.status = 403
    err.title = "Owner cannot book their own spot"
      err.message = "Forbidden",
      next(err)
    };


  next();
};

module.exports = ownsBooking;
