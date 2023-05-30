module.exports = (sequelize, Sequelize) => {
  const Preference = sequelize.define(
    'preference',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return Preference;
};
