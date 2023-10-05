const queryFilters = async (req, res, next) => {
  const { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;
};
module.exports = queryFilters;
