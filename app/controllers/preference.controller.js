const db = require('../models');

const Preference = db.preference;
const UserAccount = db.user_account;

exports.index = async (req, res) => {
  try {
    const preferences = await Preference.findAll();
    res.status(200).send({
      error: false,
      data: preferences,
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.setUserAccountPreference = async (req, res) => {
  const { user_account_id, preference_id } = req.body;

  try {
    const userAccount = await UserAccount.findByPk(user_account_id);
    if (!userAccount) {
      return res.status(404).send({
        error: true,
        message: `User account with id ${user_account_id} not found`,
      });
    }

    const preference = await Preference.findByPk(preference_id);
    if (!preference) {
      return res.status(404).send({
        error: true,
        message: `Preference with id ${preference_id} not found`,
      });
    }

    await userAccount.addPreference(preference);
    res.status(200).send({
      error: false,
      message: 'User account preference has been set',
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.unsetUserAccountPreference = async (req, res) => {
  const { user_account_id, preference_id } = req.body;

  try {
    const userAccount = await UserAccount.findByPk(user_account_id);
    if (!userAccount) {
      return res.status(404).send({
        error: true,
        message: `User account with id ${user_account_id} not found`,
      });
    }

    const preference = await Preference.findByPk(preference_id);
    if (!preference) {
      return res.status(404).send({
        error: true,
        message: `Preference with id ${preference_id} not found`,
      });
    }

    await userAccount.removePreference(preference);
    res.status(200).send({
      error: false,
      message: 'User account preference has been unset',
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.getUserAccountPreferences = async (req, res) => {
  const { user_account_id } = req.params;

  try {
    const userAccount = await UserAccount.findByPk(user_account_id);
    if (!userAccount) {
      return res.status(404).send({
        error: true,
        message: `User account with id ${user_account_id} not found`,
      });
    }

    const preferences = await userAccount.getPreferences();
    res.status(200).send({
      error: false,
      data: preferences,
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};
