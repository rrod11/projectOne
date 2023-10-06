const express = require("express");

const {
  Spot,
  SpotImage,
  User,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");

const { requireAuth } = require("../../utils/auth.js");
const spotCreationValidation = require("../../utils/spotCreationValidation");
const userRightsAuthentication = require("../../utils/userAuthentification");
const reviewVerification = require("../../utils/reviewVerification");
const notOwner = require("../../utils/notOwner");
const checkIfExists = require("../../utils/checkExisting");
const endDateCheck = require("../../utils/endDateCheck");
const notOwnerBooking = require("../../utils/notOwner");
const bookingConflict = require("../../utils/bookingConflict");
const queryFilters = require("../../utils/queryFilters");
const doesSpotExist=require("../../utils/doesSpotExist");

const router = express.Router();

router.get("/", queryFilters, async (req, res) => {
  const {
    limit,
    offset,
    size,
    page,
    minLat,
    maxLat,
    minLng,
    maxLng,
    minPrice,
    maxPrice,
    where,
  } = req.pagination;
  console.log("EVERYTHING CONTAINED IN THE WHERE:", where);
  const spots = await Spot.unscoped().findAll({
    where,
    include: [
      {
        model: SpotImage,
        attributes: ["url"],
      },
    ],
    limit,
    offset,
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
  res.json({ Spots: spotsJSON, page: page, size: size });
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
router.get("/:spotId",doesSpotExist, async (req, res) => {
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
    const spotsJSON = spots.map((ele) => ele.toJSON());

if(spotsJSON){

  spotsJSON[0].Owner = spotsJSON[0].User
  delete spotsJSON[0].User;
  if (spotsJSON[0].SpotImages.length > 1) {
    for (let j = 1; j < spotsJSON[0].SpotImages.length; j++) {
      spotsJSON[0].SpotImages[j].preview = false;
    }
  }
}

for(let spot of spotsJSON){

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
const spot = spotsJSON[0]

  res.json( spot );
});
router.post("/", [requireAuth, spotCreationValidation], async (req, res) => {
  const { user } = req;
  const currUser = await User.findOne({
    where: {
      id: user.id,
    },
  });
  // console.log("CURRENT USE:", currUser);
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  console.log("PRICING:", price);

  const newSpot = await Spot.bulkCreate([
    {
      ownerId: currUser.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    },
  ]);
  const target = await Spot.findOne({
    where: {
      name
    }
  })

  res.status(201).json(target);
});
router.post(
  "/:spotId/images",
  [requireAuth,doesSpotExist, userRightsAuthentication],
  async (req, res) => {
    const spotId = req.params.spotId;
    const targetSpot = await User.findOne({
      where: {
        id: spotId,
      },
    });

    const { url, preview } = req.body;

    const newImage = await SpotImage.bulkCreate([
      {
        spotId,
        url,
        preview,
      },

    ]);
    const target = await SpotImage.scope("defaultScope").findOne({
      where: {
        url,
      },
      attributes: {
        exclude: ["spotId"],
      },
    });

    res.json(target);
  }
);
router.put(
  "/:spotId",
  [requireAuth,doesSpotExist, userRightsAuthentication, spotCreationValidation],
  async (req, res) => {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;
    const spotId = req.params.spotId;
    const targetSpot = await Spot.findOne({
      where: {
        id: spotId,
      },
    });

    targetSpot.set({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    await targetSpot.save();
    const targetedSpot = await Spot.unscoped().findOne({
      where: {
        id: spotId,
      },
    });
    res.json(targetedSpot);
  }
);
router.delete(
  "/:spotId",
  [requireAuth,doesSpotExist, userRightsAuthentication],
  async (req, res) => {
    const spotId = req.params.spotId;
    const targetSpot = await Spot.findOne({
      where: {
        id: spotId,
      },
    });

    await targetSpot.destroy();

    res.json({ message: "Successfully deleted" });
  }
);
router.get("/:spotId/reviews",doesSpotExist, async (req, res) => {
  const spotsId = req.params.spotId;
  const allReviews = await Review.unscoped().findAll({
    where: {
      spotId: spotsId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  const allReviewsJSON = allReviews.map((ele) => ele.toJSON());
  res.json({ Reviews: allReviewsJSON });
});
router.post(
  "/:spotId/reviews",
  [
    requireAuth,
    doesSpotExist,
    notOwner,
    reviewVerification,
    checkIfExists,
  ],
  async (req, res) => {
    const { review, stars } = req.body;
    const { user } = req;
    const userId = user.id;
    const spotId = req.params.spotId;
    const targetSpot = await Spot.findOne({
      where: {
        id: spotId,
      },
    });
    const creatingReview = await Review.bulkCreate([
      {
        userId,
        spotId,
        review,
        stars,
      },
    ]);
    const newReview = await Review.unscoped().findOne({
      where: {
        review,
      },
    });
    res.status(201).json(newReview);
  }
);
router.get("/:spotId/bookings", [requireAuth, doesSpotExist], async (req, res) => {
  const spotId = req.params.spotId;
  const { user } = req;
  const userId = user.id;
  const targetSpot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });
  if (!targetSpot) {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
  if (targetSpot.ownerId == userId) {
    const allBookings = await Booking.unscoped().findAll({
      where: {
        spotId,
      },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    });
    res.json({ Bookings: allBookings });
  } else {
    const someBookings = await Booking.findAll({
      where: {
        spotId,
      },
      attributes: ["spotId", "startDate", "endDate"],
    });
    res.json({ Bookings: someBookings });
  }
});
router.post(
  "/:spotId/bookings",
  [requireAuth,doesSpotExist, notOwnerBooking, endDateCheck, bookingConflict],
  async (req, res) => {
    const { startDate, endDate } = req.body;
    const { user } = req;
    const userId = user.id;
    const spotId = req.params.spotId;
    const targetSpot = await Spot.findOne({
      where: {
        id: spotId,
      },
    });
    if (!targetSpot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }
    const newBooking = await Booking.create({
      startDate,
      endDate,
      userId,
      spotId,
    });
    console.log("NEW BOOKING:", newBooking);

    res.json(newBooking);
  }
);

module.exports = router;
