const preferenceSeeder = require('./preference.seeder');

const init = async () => {
  await preferenceSeeder();
};

module.exports = init;
