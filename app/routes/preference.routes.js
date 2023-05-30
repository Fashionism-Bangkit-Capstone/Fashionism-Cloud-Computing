const router = require('express').Router();
const { authJwt } = require('../middleware');
const { preferenceValidator } = require('../validators');
const controller = require('../controllers/preference.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept',
    );
    next();
  });

  router.get('/', authJwt.verifyToken, controller.index);

  router.post(
    '/set-user-account-preference',
    authJwt.verifyToken,
    preferenceValidator.setOrUnsetUserAccountPreference,
    controller.setUserAccountPreference,
  );

  router.post(
    '/unset-user-account-preference',
    authJwt.verifyToken,
    preferenceValidator.setOrUnsetUserAccountPreference,
    controller.unsetUserAccountPreference,
  );

  router.get(
    '/user-account-preferences/:user_account_id',
    authJwt.verifyToken,
    controller.getUserAccountPreferences,
  );

  app.use('/api/v1/preferences', router);
};
