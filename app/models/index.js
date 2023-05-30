const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  timestamps: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models here
db.user_account = require('./user_account.model')(sequelize, Sequelize);
db.msme_account = require('./msme_account.model')(sequelize, Sequelize);
db.preference = require('./preference.model')(sequelize, Sequelize);
db.product = require('./product.model')(sequelize, Sequelize);

// define associations here
db.user_account.belongsToMany(db.preference, {
  through: 'user_account_preferences',
  as: 'preferences',
  foreignKey: 'user_account_id',
  otherKey: 'preference_id',
});

db.preference.belongsToMany(db.user_account, {
  through: 'user_account_preferences',
  as: 'user_accounts',
  foreignKey: 'preference_id',
  otherKey: 'user_account_id',
});

module.exports = db;
