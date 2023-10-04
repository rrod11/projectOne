const { Review } = require("../db/models");
const checkIfExists = async (req, res, next) => {
  const { user } = req;
  const userId = user.id;
  const spotId = req.params.spotId;
  const err = {};
  const checkIn = await Review.findAll({
    where: {
      spotId,
    },
  });
  const allReviewsJSON = checkIn.map((ele) => ele.toJSON());
  for (let ele of allReviewsJSON) {
    if (ele.userId == userId) {
      err.status = 500;
      err.message = "User already has a review for this spot";
      next(err);
    }
  }
  next();
};

module.exports = checkIfExists;
