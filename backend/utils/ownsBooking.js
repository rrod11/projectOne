const { Spot, User, Review, Booking } = require("../db/models");
const ownsBooking = async (req, res, next) => {
  const { user } = req;
  const userId = user.id;
  const bookingId = req.params.bookingId;
  const target = await Booking.findOne({
    where: {
      id: bookingId,
    },
  });
  if (target.userId != userId) {
    res.status(404).json({
      message: "Booking couldn't be found",
    });
  }
  next();
};

module.exports = ownsBooking;
