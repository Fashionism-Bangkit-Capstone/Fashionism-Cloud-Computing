const db = require('../models');

const Category = db.category;

exports.index = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send({
      error: false,
      data: categories,
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};
