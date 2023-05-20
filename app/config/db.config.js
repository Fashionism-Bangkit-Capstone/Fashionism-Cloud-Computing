const env = require('../utils/env.utils');

module.exports = {
  HOST: env('DB_HOST'),
  PORT: env('DB_PORT'),
  USER: env('DB_USER'),
  PASSWORD: env('DB_PASSWORD'),
  DB: env('DB_NAME'),
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
