const express = require("express");
const { requireAuth } = require("../../utils/auth");
const {
  Review,
  User,
  Spot,
  ReviewImage,
  SpotImage,
} = require("../../db/models");
const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const usersId = user.id;
  console.log("CURRENT USER INFO:", user);
  const allReviews = await Review.unscoped().findAll({
    where: {
      userId: usersId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
        include: {
          model: SpotImage,
        },
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });
  const allReviewsJSON = allReviews.map((ele) => ele.toJSON());
  console.log(allReviewsJSON);
  for (let i = 0; i < allReviewsJSON.length; i++) {
    if (allReviewsJSON[i].Spot.SpotImages.length > 0) {
      allReviewsJSON[i].Spot.previewImage =
        allReviewsJSON[i].Spot.SpotImages[0].url;
      delete allReviewsJSON[i].Spot.SpotImages;
    }
  }
  res.json({ Reviews: allReviewsJSON });
});

module.exports = router;
