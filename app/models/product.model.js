module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    'products',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      product_image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    },
  );

  return Product;
};
