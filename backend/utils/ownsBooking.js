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
  const ownerId = target.Spot.ownerId;
  console.log(target.userId != userId);
  console.log("TARGET USER ID:", target.userId);
  console.log("OWNERS ID", ownerId);
  console.log("USERS ID", userId);
  console.log(Math.abs(ownerId) != Math.abs(userId));
  if (target.userId != userId && ownerId !== userId) {
    return res.status(404).json({
      message: "Booking couldn't be found",
    });
  }

  next();
};

module.exports = ownsBooking;
