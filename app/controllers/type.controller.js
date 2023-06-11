const db = require('../models');

const Type = db.type;

exports.index = async (req, res) => {
  try {
    const types = await Type.findAll();
    res.status(200).send({
      error: false,
      data: types,
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};
