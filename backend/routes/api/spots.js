const express = require("express");
// const bcrypt = require("bcryptjs");
// const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot } = require("../../db/models");
const { SpotImage } = require("../../db/models");
const { Review } = require("../../db/models");

// const { check } = require("express-validator");
// const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

router.get("/", async (req, res) => {
  const spots = await Spot.unscoped().findAll({
    include: [
      {
        model: SpotImage,
        attributes: ["url"],
      },
    ],
  });
  const spotsJSON = spots.map((ele) => ele.toJSON());

  for (let i = 0; i < spotsJSON.length; i++) {
    if (spotsJSON[i].SpotImages.length > 0) {
      spotsJSON[i].previewImage = spotsJSON[i].SpotImages[0].url;
      delete spotsJSON[i].SpotImages;
    }
  }
  for (let spot of spotsJSON) {
    const sum = await Review.sum("stars", {
      where: {
        spotId: spot.id,
      },
    });
    const total = await Review.count({
      where: {
        spotId: spot.id,
      },
    });
    spot.avgRating = sum / total;
  }
  res.json({ Spots: spotsJSON });
});

module.exports = router;
