const { validationResult } = require('express-validator');

const validationResultUtils = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: true,
      errors: errors.mapped(),
    });
  }
  next();
};

module.exports = validationResultUtils;
