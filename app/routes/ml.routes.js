const router = require('express').Router();
const controller = require('../controllers/ml.controller');
const constants = require('../utils/constants.utils');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept',
    );
    next();
  });

  router.get('/products', controller.getProducts);

  app.use(`/api/${constants.apiVersion}/ml`, router);
};
