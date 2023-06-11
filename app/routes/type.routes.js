const router = require('express').Router();
const { authJwt } = require('../middleware');
const controller = require('../controllers/type.controller');
const constants = require('../utils/constants.utils');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept',
    );
    next();
  });

  router.get('/', authJwt.verifyToken, controller.index);

  app.use(`/api/${constants.apiVersion}/type`, router);
};
