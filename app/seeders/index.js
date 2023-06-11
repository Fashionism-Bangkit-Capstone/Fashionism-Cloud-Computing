const msmeAccountSeeder = require('./msme_account.seeder');
const typeSeeder = require('./type.seeder');
const categorySeeder = require('./category.seeder');
const productSeeder = require('./product.seeder');

const init = async () => {
  await msmeAccountSeeder();
  await typeSeeder();
  await categorySeeder();
  await productSeeder();
};

module.exports = init;
