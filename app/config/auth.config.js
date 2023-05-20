const env = require('../utils/env.utils');

module.exports = {
  secret: env('JWT_SECRET'),
};
