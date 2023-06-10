const db = require('../models');

const Preference = db.preference;

const init = async () => {
  const preferences = ['Casual', 'Street', 'Office', 'Formal'];

  await Preference.destroy({ where: {} });
  await Preference.sequelize.query(
    'ALTER TABLE preferences AUTO_INCREMENT = 1',
  );
  await Preference.bulkCreate(
    preferences.map((preference) => ({ name: preference })),
  );
};

module.exports = init;
