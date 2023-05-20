const { body } = require('express-validator');
const validationResultUtils = require('../utils/validation_result.utils');

const signup = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty.')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long.'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty.')
    .isEmail()
    .withMessage('Email is not valid.'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty.')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  validationResultUtils,
];

const signin = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty.')
    .isEmail()
    .withMessage('Email is not valid.'),
  body('password').notEmpty().withMessage('Password cannot be empty.'),
  validationResultUtils,
];

const authValidator = {
  signup,
  signin,
};

module.exports = authValidator;
