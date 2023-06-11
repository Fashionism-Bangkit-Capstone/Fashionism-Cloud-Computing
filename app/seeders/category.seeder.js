const db = require('../models');

const Category = db.category;
const init = async () => {
  const categories = ['Casual', 'Street', 'Office', 'Formal'];

  await Category.destroy({ where: {} });
  await Category.sequelize.query('ALTER TABLE categories AUTO_INCREMENT = 1');
  await Category.bulkCreate(categories.map((category) => ({ name: category })));
};

module.exports = init;
