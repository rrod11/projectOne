const { Spot, User, Review, Booking } = require("../db/models");
const ownsBooking = async (req, res, next) => {
  const { user } = req;
  const userId = user.id;
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
  if ( target == null || target.userId != userId && ownerId !== userId) {
    return res.status(404).json({
      message: "Booking couldn't be found",
    });
  }

  next();
};

module.exports = ownsBooking;
