const { Op } = require("sequelize");
const queryFilters = async (req, res, next) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;
  const where = {};
  let tripped = false;
  const err = {};
  err.message = "Bad Request";
  err.errors = {};
  function isNumber(value) {
    return typeof value === "number";
  }
  if (page && page < 1) {
    err.errors.page = "Page must be greater than or equal to 1";
    tripped = true;
  }
  if (size && size < 1) {
    err.errors.size = "Size must be greater than or equal to 1";
    tripped = true;
  }
  if (maxLat && isNaN(maxLat)) {
    err.errors.maxLat = "Maximum latitude is invalid";
    tripped = true;
  }
  if (minLat && isNaN(minLat)) {
    err.errors.minLat = "Minimum latitude is invalid";
    tripped = true;
  }
  if (maxLng && isNaN(maxLng)) {
    err.errors.maxLng = "Maximum longitude is invalid";
    tripped = true;
  }
  if (minLng && isNaN(minLng)) {
    err.errors.maxLng = "Minimum longitude is invalid";
    tripped = true;
  }
  if (minPrice && minPrice < 0) {
    err.errors.minPrice = "Minimum price must be greater than or equal to 0";
    tripped = true;
  }
  if (maxPrice && maxPrice < 0) {
    err.errors.maxPrice = "Maximum price must be greater than or equal to 0";
    tripped = true;
  }
  if ((page && isNaN(page)) || (page && page > 10) || !page) page = 1;
  if ((size && isNaN(size)) || (size && size > 20) || !size) size = 20;

  page = parseInt(page);
  size = parseInt(size);
  let limit = size;
  let offset = size * (page - 1);

  req.pagination = {
    limit,
    offset,
    size,
    page,
    where,
  };
  if (tripped) {
    err.status = 400;
    next(err);
  }

  next();
};
module.exports = queryFilters;
