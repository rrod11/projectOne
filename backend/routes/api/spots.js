const express = require("express");
// const bcrypt = require("bcryptjs");
// const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, User } = require("../../db/models");
// const { SpotImage } = require("../../db/models");
const { Review } = require("../../db/models");
const { requireAuth } = require("../../utils/auth.js");

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
  const spots = await Spot.unscoped().findAll({
    where: {
      id: spotId,
    },
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });
  console.log("SPOT VALUE:", spots);
  if (spots.length === 0) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
  const spotsJSON = spots.map((ele) => ele.toJSON());

  for (let i = 0; i < spotsJSON.length; i++) {
    spotsJSON[i].Owner = spotsJSON[i].User;
    delete spotsJSON[i].User;
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
    const total = await Review.count({
      where: {
        spotId,
      },
    });
    spot.avgRating = sum / total;
    spot.numReviews = total;
  }
  res.json({ Spots: spotsJSON });
});
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;
  const currUser = await User.findOne({
    where: {
      id: user.id,
    },
  });
  // console.log("CURRENT USE:", currUser);
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const newSpot = await Spot.bulkCreate([
    {
      ownerId: currUser.id,
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
    },
  ]);
  // const foundSpot = await Spot.scope(["defaultScope"]).findOne({
  //   where: {
  //     lat,
  //     lng,
  //   },
  // });
  res.status(201).json(newSpot);
});

module.exports = router;
