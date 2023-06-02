const router = require('express').Router();
const { verifySignUp } = require('../middleware');
const { authValidator } = require('../validators');
const controller = require('../controllers/auth.controller');
const constants = require('../utils/constants.utils');

const db = require('../models');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept',
    );
    next();
  });

  // user account auth routes
  router.post(
    '/user/signup',
    verifySignUp.checkDuplicateEmail(db.user_account),
    authValidator.signup,
    controller.signup(db.user_account),
  );

  router.post(
    '/user/signin',
    authValidator.signin,
    controller.signin(db.user_account),
  );

  // msme account auth routes
  router.post(
    '/msme/signup',
    verifySignUp.checkDuplicateEmail(db.msme_account),
    authValidator.signup,
    controller.signup(db.msme_account),
  );

  router.post(
    '/msme/signin',
    authValidator.signin,
    controller.signin(db.msme_account),
  );

  app.use(`/api/${constants.apiVersion}/auth`, router);
};
