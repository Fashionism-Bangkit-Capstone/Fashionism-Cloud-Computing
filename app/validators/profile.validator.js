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

const changePassword = [
  body('old_password').notEmpty().withMessage('Old password cannot be empty.'),
  body('new_password').notEmpty().withMessage('New password cannot be empty.'),
  body('confirm_password')
    .notEmpty()
    .withMessage('Confirm password cannot be empty.')
    .custom((value, { req }) => {
      if (value !== req.body.new_password) {
        throw new Error('Confirm password does not match!');
      }

      return true;
    }),
  formValidate,
];

const profileValidator = {
  update,
  changePassword,
};

module.exports = profileValidator;
