const express = require("express");
// const bcrypt = require("bcryptjs");
// const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot } = require("../../db/models");
const { SpotImage } = require("../../db/models");
// const { check } = require("express-validator");
// const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    include: {
      model: SpotImage,
      attributes: ["url"],
      as: "previewImage",
    },
  });
  // console.log(spots);
  return res.json(spots);
});

module.exports = router;
