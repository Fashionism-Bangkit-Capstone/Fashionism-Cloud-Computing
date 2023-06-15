const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  // logging: 0,

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
db.type = require('./type.model')(sequelize, Sequelize);
db.category = require('./category.model')(sequelize, Sequelize);
db.product = require('./product.model')(sequelize, Sequelize);

// define associations here
db.msme_account.hasMany(db.product, {
  as: 'products',
  foreignKey: 'msme_account_id',
});

db.product.belongsTo(db.msme_account, {
  foreignKey: 'msme_account_id',
});

db.type.hasMany(db.product, {
  as: 'products',
  foreignKey: 'type_id',
});

db.product.belongsTo(db.type, {
  foreignKey: 'type_id',
});

db.category.hasMany(db.product, {
  as: 'products',
  foreignKey: 'category_id',
});

db.product.belongsTo(db.category, {
  foreignKey: 'category_id',
});

db.user_account.belongsToMany(db.product, {
  through: 'user_account_favorites',
  as: 'favorites',
  foreignKey: 'user_account_id',
  otherKey: 'product_id',
});

db.product.belongsToMany(db.user_account, {
  through: 'user_account_favorites',
  as: 'user_accounts',
  foreignKey: 'product_id',
  otherKey: 'user_account_id',
});

// custom methods
db.getMsmeName = async (msmeAccountId) => {
  const msmeAccount = await db.msme_account.findByPk(msmeAccountId);
  return msmeAccount.name;
};

db.randomizeProducts = async () => {
  const products = await db.product.findAll({
    order: Sequelize.literal('rand()'),
    limit: 5,
  });
  return products;
};

module.exports = db;
