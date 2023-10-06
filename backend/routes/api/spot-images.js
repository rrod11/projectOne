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
const ownSpotImage = require("../../utils/ownsSpotImage");
const doesSpotImageExist=require("../../utils/doesSpotImageExist");

const router = express.Router();

router.delete("/:imageId", [requireAuth,doesSpotImageExist, ownSpotImage], async (req, res) => {
  const imageId = req.params.imageId;
  await SpotImage.destroy({
    where: {
      id: imageId,
    },
  });
  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
