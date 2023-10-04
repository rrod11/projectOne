const { Review, User, ReviewImage } = require("../db/models");
const reviewVerification = (req, _res, next) => {
  const { review, stars } = req.body;
  console.log("MY CURRENT  REVIEW VERIFICATION:", stars);
  const err = {};
  err.errors = {};
  err.message = "Bad Request";
  let tripped = false;
  if (!review) {
    err.errors.review = "Review text is required";
    tripped = true;
  }
  if (!stars) {
    err.errors.stars = "Stars must be an integer from 1 to 5";
    tripped = true;
  }
  if (isNaN(stars)) {
    err.errors.stars = "Stars must be an integer from 1 to 5";
    tripped = true;
  }
  if (stars <= 0) {
    err.errors.stars = "Stars must be an integer from 1 to 5";
    tripped = true;
  }
  if (stars >= 6) {
    err.errors.stars = "Stars must be an integer from 1 to 5";
    tripped = true;
  }
  if (tripped === true) {
    err.status = 400;
    next(err);
  } else {
    next();
  }
};

module.exports = reviewVerification;
