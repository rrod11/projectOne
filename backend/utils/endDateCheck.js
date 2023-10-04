const { Spot, User, Review } = require("../db/models");
const { Sequelize } = require("sequelize");
const endDateCheck = async (req, _res, next) => {
  const { startDate, endDate } = req.body;
  const err = {};
  err.message = "Bad Request";
  err.errors = {};
  function checkingDate(startDate, endDate) {
    if (endDate <= startDate) {
      return true;
    }
    return false;
  }
  if (checkingDate) {
    err.status = 400;
    err.errors.endDate = "endDate cannot be on or before startDate";
    next(err);
  } else {
    next();
  }
};

module.exports = endDateCheck;
