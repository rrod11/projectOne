const express = require("express");
const {
  Review,
  User,
  Spot,
  ReviewImage,
  SpotImage,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const userHasRightsAuthentication = require("../../utils/userHasRights");
const reviewLengthVerification = require("../../utils/reviewLengthVerification");
const userReviewRightsAuthentication = require("../../utils/userReviewRights");
const reviewVerification = require("../../utils/reviewVerification");
const doesReviewExist = require("../../utils/doesReviewExist");
const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const usersId = user.id;
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
  [
    requireAuth,
    doesReviewExist,
    userHasRightsAuthentication,
    reviewLengthVerification,
  ],
  async (req, res) => {
    const reviewId = req.params.reviewId;
    const { url } = req.body;
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
  [
    requireAuth,
    doesReviewExist,
    userReviewRightsAuthentication,
    reviewVerification,
  ],
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
router.delete(
  "/:reviewId",
  [requireAuth, doesReviewExist, userReviewRightsAuthentication],
  async (req, res) => {
    const reviewId = req.params.reviewId;
    const targetReview = await Review.findOne({
      where: {
        id: reviewId,
      },
    });
    await targetReview.destroy();
    res.json({
      message: "Successfully deleted",
    });
  }
);

module.exports = router;
