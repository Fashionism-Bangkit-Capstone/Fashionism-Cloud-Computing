const db = require('../models');

const Type = db.type;

const init = async () => {
  const types = ['Top', 'Bottom', 'Shoes', 'Accessories'];

  await Type.destroy({ where: {} });
  await Type.sequelize.query('ALTER TABLE types AUTO_INCREMENT = 1');
  await Type.bulkCreate(types.map((type) => ({ name: type })));
};

module.exports = init;
