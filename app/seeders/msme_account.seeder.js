const bcrypt = require('bcryptjs');
const db = require('../models');

const MsmeAccount = db.msme_account;

const init = async () => {
  const msmeAccountNames = [
    'ActiveStyle Outfitters',
    'FitFusion Apparel',
    'EnduranceThreads Outlet',
  ];

  await MsmeAccount.destroy({ where: {} });
  await MsmeAccount.sequelize.query(
    'ALTER TABLE msme_accounts AUTO_INCREMENT = 1',
  );

  const msmeAccounts = msmeAccountNames.map((name) => ({
    name,
    email: `${name.replace(/\s/g, '').toLowerCase()}@mail.com`,
    password: bcrypt.hashSync('password', 8),
  }));

  await MsmeAccount.bulkCreate(msmeAccounts);
};

module.exports = init;
