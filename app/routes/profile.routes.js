const router = require('express').Router();
const { authJwt, processFile } = require('../middleware');
const { profileValidator } = require('../validators');
const controller = require('../controllers/profile.controller');

const db = require('../models');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept',
    );
    next();
  });

  // user profile routes
  router.get(
    '/user/:id',
    authJwt.verifyToken,
    controller.show(db.user_account),
  );

  router.put(
    '/user/:id',
    authJwt.verifyToken,
    (req, res, next) => {
      processFile.single('avatar')(req, res, (err) => {
        if (err) {
          return res.status(500).send({
            message: err.message,
          });
        }

        next();
      });
    },
    profileValidator.update,
    controller.update(db.user_account),
  );

  // msme profile routes
  router.get(
    '/msme/:id',
    authJwt.verifyToken,
    controller.show(db.msme_account),
  );

  router.put(
    '/msme/:id',
    authJwt.verifyToken,
    (req, res, next) => {
      processFile.single('avatar')(req, res, (err) => {
        if (err) {
          return res.status(500).send({
            message: err.message,
          });
        }

        next();
      });
    },
    profileValidator.update,
    controller.update(db.msme_account),
  );

  app.use('/api/v1/profile', router);
};
