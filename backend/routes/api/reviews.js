const express = require("express");
const { requireAuth } = require("../../utils/auth");
const {
  Review,
  User,
  Spot,
  ReviewImage,
  SpotImage,
} = require("../../db/models");
const userHasRightsAuthentication = require("../../utils/userAuthentification");
const reviewLengthVerification = require("../../utils/reviewLengthVerification");
const userReviewRightsAuthentication = require("../../utils/userAuthentification");
const reviewVerification = require("../../utils/reviewVerification");
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
router.post(
  "/:reviewId/images",
  [requireAuth, userHasRightsAuthentication, reviewLengthVerification],
  async (req, res) => {
    const reviewId = req.params.reviewId;
    console.log("MY REVIEW ID:", reviewId);
    const { url } = req.body;
    console.log("MY URL:", url);
    await ReviewImage.bulkCreate([
      {
        url,
        reviewId,
      },
    ]);
    const foundImage = await ReviewImage.findOne({
      where: {
        url,
        reviewId,
      },
      attributes: ["id", "url"],
    });
    res.json(foundImage);
  }
);
router.put(
  "/:reviewId",
  [requireAuth, userReviewRightsAuthentication, reviewVerification],
  async (req, res) => {
    const { review, stars } = req.body;
    const reviewId = req.params.reviewId;
    const editedReview = await Review.unscoped().findOne({
      where: {
        id: reviewId,
      },
    });
    await editedReview.update({
      review,
      stars,
    });

    res.json(editedReview);
  }
);

module.exports = router;
