const { body } = require('express-validator');
const formValidate = require('../utils/form_validate.utils');

const update = [
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
  formValidate,
];

const profileValidator = {
  update,
};

module.exports = profileValidator;
