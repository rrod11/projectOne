const { Spot, User, Review, SpotImage} = require("../db/models");
const doesSpotImageExist = async (req, _res, next) => {
  const imageId = req.params.imageId;
  const { user } = req;
  const err = {};
  err.errors = {}
  err.errors.message = "Spot Image couldn't be found";
  const target = await SpotImage.findOne({
    where: {
      id: imageId,
    },
  });

  if (!target) {
    err.title = "Could not find a Spot Image with that Id";
    err.status = 404;
    next(err);
  }
  next();
};

module.exports = doesSpotImageExist;
