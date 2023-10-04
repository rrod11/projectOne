const { Spot, User, Review } = require("../db/models");
const { Sequelize } = require("sequelize");
const endDateCheck = async (req, _res, next) => {
  const { startDate, endDate } = req.body;
  const err = {};
  err.message = "Bad Request";
  err.errors = {};

  const lastDay = new Date(endDate);
  const firstDay = new Date(startDate);

  if (lastDay <= firstDay) {
    err.status = 400;
    err.errors.endDate = "endDate cannot be on or before startDate";
    next(err);
  } else {
    next();
  }
};

module.exports = endDateCheck;
