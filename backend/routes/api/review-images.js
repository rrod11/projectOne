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
const ownsReviewImage = require("../../utils/ownsReviewImage");
const doesReviewImageExist=require("../../utils/doesReviewImageExist");

const router = express.Router();

router.delete("/:imageId", [requireAuth,doesReviewImageExist, ownsReviewImage], async (req, res) => {
  const imageId = req.params.imageId;
  await ReviewImage.destroy({
    where: {
      id: imageId,
    },
  });
  res.json({
    message: "Successfully deleted",
  });
});
module.exports = router;
