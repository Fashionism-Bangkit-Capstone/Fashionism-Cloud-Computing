const { body } = require('express-validator');
const formValidate = require('../utils/form_validate.utils');

const setOrUnsetUserAccountPreference = [
  body('user_account_id')
    .notEmpty()
    .withMessage('User account id cannot be empty.')
    .isInt()
    .withMessage('User account id must be an integer.'),
  body('preference_id')
    .notEmpty()
    .withMessage('Preference id cannot be empty.')
    .isInt()
    .withMessage('Preference id must be an integer.'),
  formValidate,
];

const preferenceValidator = {
  setOrUnsetUserAccountPreference,
};

module.exports = preferenceValidator;
