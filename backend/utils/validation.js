const { validationResult } = require("express-validator");
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors.array().forEach((error) => {
      errors[error.path] = error.msg;
    });
    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    // for (let ele of validationErrors.errors) {
    //   if (ele.path == "credential") {
    //     err.errors.credential = "Email or username is required";
    //   }

    //   if (ele.path == "password") {
    //     err.errors.password = "Password is required";
    //   }
    // }
    next(err);
  }
  next();
};

module.exports = { handleValidationErrors };
