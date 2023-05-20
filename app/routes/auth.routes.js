const router = require('express').Router();
const { verifySignUp } = require('../middleware');
const { authValidator } = require('../validators');
const controller = require('../controllers/auth.controller');

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

  // msmes account auth routes
  router.post(
    '/msmes/signup',
    verifySignUp.checkDuplicateEmail(db.msmes_account),
    authValidator.signup,
    controller.signup(db.msmes_account),
  );

  router.post(
    '/msmes/signin',
    authValidator.signin,
    controller.signin(db.msmes_account),
  );

  app.use('/api/v1/auth', router);
};
