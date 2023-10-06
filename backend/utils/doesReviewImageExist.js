const { Spot, User, Review, ReviewImage } = require("../db/models");
const doesReviewImageExist = async (req, _res, next) => {
  const imageId = req.params.imageId;
  const { user } = req;
  const err = {};
  err.errors = {}
  err.errors.message = "Review Image couldn't be found";
  const target = await ReviewImage.findOne({
    where: {
      id: imageId,
    },
  });

  if (!target) {
    err.title = "Could not find a Review Image with that Id";
    err.status = 404;
    next(err);
  }
  next();
};

module.exports = doesReviewImageExist;
