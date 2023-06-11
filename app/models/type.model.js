module.exports = (sequelize, Sequelize) => {
  const Types = sequelize.define(
    'types',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    },
  );

  return Types;
};
