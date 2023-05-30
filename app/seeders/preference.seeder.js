const db = require('../models');

const Preference = db.preference;

const init = async () => {
  const preferences = ['Casual', 'Street', 'Office', 'Formal'];
  await Preference.bulkCreate(
    preferences.map((preference) => ({ name: preference })),
  );
};

module.exports = init;
