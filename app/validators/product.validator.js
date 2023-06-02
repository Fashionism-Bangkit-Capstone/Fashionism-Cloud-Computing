const { body } = require('express-validator');
const formValidate = require('../utils/form_validate.utils');

const store = [
  body('name').notEmpty().withMessage('Product name cannot be empty.'),
  body('description')
    .notEmpty()
    .withMessage('Product description cannot be empty.'),
  body('stock')
    .notEmpty()
    .withMessage('Product stock cannot be empty.')
    .isInt()
    .withMessage('Product stock must be a number.'),
  body('price')
    .notEmpty()
    .withMessage('Product price cannot be empty.')
    .isInt()
    .withMessage('Product price must be a number.'),
  formValidate,
];

const update = [
  body('name').notEmpty().withMessage('Product name cannot be empty.'),
  body('description')
    .notEmpty()
    .withMessage('Product description cannot be empty.'),
  body('stock')
    .notEmpty()
    .withMessage('Product stock cannot be empty.')
    .isInt()
    .withMessage('Product stock must be a number.'),
  body('price')
    .notEmpty()
    .withMessage('Product price cannot be empty.')
    .isInt()
    .withMessage('Product price must be a number.'),
  formValidate,
];

const productValidator = {
  store,
  update,
};

module.exports = productValidator;
