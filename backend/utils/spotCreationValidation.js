const spotCreationValidation = (req, _res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  let tripped = false;
  const err = {};
  err.message = "Bad Request";
  err.errors = {};
  if (
    !address ||
    !city ||
    !state ||
    !country ||
    !lat ||
    !lng ||
    !name ||
    !description ||
    !price
  ) {
    if (!address) {
      err.errors.address = "Street address is required";
      tripped = true;
    }
    if (!city) {
      err.errors.city = "City is required";
      tripped = true;
    }
    if (!state) {
      err.errors.state = "State is required";
      tripped = true;
    }
    if (!country) {
      err.errors.country = "Country is required";
      tripped = true;
    }
    if (!lat) {
      err.errors.lat = "Latitude is not valid";
      tripped = true;
    }
    if (!lng) {
      err.errors.lng = "Longitude is not valid";
      tripped = true;
    }
    if (!name) {
      err.errors.name = "Name must be less than 50 characters";
      tripped = true;
    }
    if (!description) {
      err.errors.description = "Description is required";
      tripped = true;
    }
    if (!price) {
      err.errors.price = "Price per day is required";
      tripped = true;
    }
  }
  if (Number(lat) < -90 || Number(lat) > 90 || isNaN(lat)) {
    err.errors.lat = "Latitude is not a valid value";
    tripped = true;
  }
  if (Number(lng) < -180 || Number(lng) > 180 || isNaN(lng)) {
    err.errors.lng = "Longitude is not a valid value";
    tripped = true;
  }
  if (price <= 0) {
    err.errors.price = "Price per day can not be free or less than 0";
    tripped = true;
  }
  if (tripped === true) {
    err.status = 400;
    next(err);
  } else next();
};

module.exports = spotCreationValidation;
