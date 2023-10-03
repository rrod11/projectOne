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
<<<<<<< Updated upstream
=======
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const userId = user.id;
  const spots = await Spot.unscoped().findAll({
    where: {
      ownerId: userId,
    },
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
router.get("/:spotId", async (req, res) => {
  const spotId = req.params.spotId;
  // console.log("MY CURRENT ID:", spotId);
  const spots = await Spot.unscoped().findAll({
    where: {
      id: spotId,
    },
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
    ],
  });
  const spotsJSON = spots.map((ele) => ele.toJSON());

  for (let i = 0; i < spotsJSON.length; i++) {
    // console.log("MY SPOT IMAGES!!:", spotsJSON[i].SpotImages);
    if (spotsJSON[i].SpotImages.length > 1) {
      for (let j = 1; j < spotsJSON[i].SpotImages.length; j++) {
        spotsJSON[i].SpotImages[j].preview = false;
      }
    }
  }
  for (let spot of spotsJSON) {
    const sum = await Review.sum("stars", {
      where: {
        spotId,
      },
    });
    console.log("HERES SUM:", sum);
    const total = await Review.count({
      where: {
        spotId,
      },
    });
    console.log("HERES TOTAL:", total);
    spot.avgRating = sum / total;
    spot.numReviews = total;
  }
  res.json({ Spots: spotsJSON });
});
>>>>>>> Stashed changes

module.exports = router;
