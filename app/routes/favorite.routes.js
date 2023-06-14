const router = require('express').Router();
const { authJwt } = require('../middleware');
const { favoriteValidator } = require('../validators');
const controller = require('../controllers/favorite.controller');
const constants = require('../utils/constants.utils');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept',
    );
    next();
  });

  router.get('/:user_account_id', authJwt.verifyToken, controller.index);
  router.post(
    '/add',
    authJwt.verifyToken,
    favoriteValidator.addOrRemoveFavorite,
    controller.addFavorite,
  );
  router.post(
    '/remove',
    authJwt.verifyToken,
    favoriteValidator.addOrRemoveFavorite,
    controller.removeFavorite,
  );

  // check if product is in favorites
  router.get(
    '/:user_account_id/:product_id',
    authJwt.verifyToken,
    controller.isFavorite,
  );

  app.use(`/api/${constants.apiVersion}/favorites`, router);
};
