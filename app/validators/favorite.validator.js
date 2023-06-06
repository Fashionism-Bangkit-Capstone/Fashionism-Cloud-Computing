const { body } = require('express-validator');
const formValidate = require('../utils/form_validate.utils');

const addOrRemoveFavorite = [
  body('user_account_id')
    .notEmpty()
    .withMessage('User account id cannot be empty.')
    .isInt()
    .withMessage('User account id must be an integer.'),
  body('product_id')
    .notEmpty()
    .withMessage('Product id cannot be empty.')
    .isInt()
    .withMessage('Product id must be an integer.'),
  formValidate,
];

const favoriteValidator = {
  addOrRemoveFavorite,
};

module.exports = favoriteValidator;
