const db = require('../models');
const config = require('../config/google_cloud.config');
const constants = require('../utils/constants.utils');

const Product = db.product;

exports.getProducts = async (req, res) => {
  try {
    const data = await Product.findAll();
    return res.status(200).send({
      error: false,
      data: data.map((product) => ({
        ...product.dataValues,
        product_image: `${constants.bucketPublicUrl}/${config.bucketName}/${constants.productImageFolderName}/${product.product_image}`,
      })),
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};
