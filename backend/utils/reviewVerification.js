const reviewVerification = (req, res, next) => {
  const { review, stars } = req.body;
  const err = {};
  err.errors = {};
  err.message = "Bad Request";
  let tripped = false;
  if (!review) {
    err.errors.review = "Review text is required";
    tripped = true;
  }
  if (!stars || isNaN(stars) || stars <= 0 || stars > 5) {
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
