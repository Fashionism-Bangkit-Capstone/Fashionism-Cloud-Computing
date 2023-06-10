const preferenceSeeder = require('./preference.seeder');
const msmeAccountSeeder = require('./msme_account.seeder');
const productSeeder = require('./product.seeder');

const init = async () => {
  await preferenceSeeder();
  await msmeAccountSeeder();
  await productSeeder();
};

module.exports = init;
