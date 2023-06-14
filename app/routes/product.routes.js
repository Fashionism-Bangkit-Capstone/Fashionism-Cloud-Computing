const router = require('express').Router();
const { authJwt, processFile } = require('../middleware');
const { productValidator } = require('../validators');
const controller = require('../controllers/product.controller');
const constants = require('../utils/constants.utils');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept',
    );
    next();
  });

  router.get('/:msme_account_id', authJwt.verifyToken, controller.index);
  router.post(
    '/:msme_account_id',
    authJwt.verifyToken,
    authJwt.verifyToken,
    (req, res, next) => {
      processFile.single('product_image')(req, res, (err) => {
        if (err) {
          return res.status(500).send({
            message: err.message,
          });
        }

        next();
      });
    },
    productValidator.store,
    controller.store,
  );
  router.get('/:msme_account_id/:id', authJwt.verifyToken, controller.show);

  router.put(
    '/:msme_account_id/:id',
    authJwt.verifyToken,
    (req, res, next) => {
      processFile.single('product_image')(req, res, (err) => {
        if (err) {
          return res.status(500).send({
            message: err.message,
          });
        }

        next();
      });
    },
    productValidator.update,
    controller.update,
  );
  router.delete(
    '/:msme_account_id/:id',
    authJwt.verifyToken,
    controller.destroy,
  );

  app.get(
    `/api/${constants.apiVersion}/product/total/:msme_account_id`,
    authJwt.verifyToken,
    controller.getTotalProducts,
  );

  app.get(
    `/api/${constants.apiVersion}/product/recent/:msme_account_id`,
    authJwt.verifyToken,
    controller.getRecentProducts,
  );

  app.get(
    `/api/${constants.apiVersion}/product/:msme_account_id/type/:type_id`,
    authJwt.verifyToken,
    controller.getProductsByType,
  );

  app.get(
    `/api/${constants.apiVersion}/product/:msme_account_id/category/:category_id`,
    authJwt.verifyToken,
    controller.getProductsByCategory,
  );

  app.get(
    `/api/${constants.apiVersion}/product/category/:category_id`,
    authJwt.verifyToken,
    controller.getProductsByCategoryOnUser,
  );

  app.get(
    `/api/${constants.apiVersion}/product/get/:id`,
    authJwt.verifyToken,
    controller.getProductOnUser,
  );

  app.get(
    `/api/${constants.apiVersion}/product/all`,
    authJwt.verifyToken,
    controller.getAllProductsOnUser,
  );

  app.use(`/api/${constants.apiVersion}/product`, router);
};
