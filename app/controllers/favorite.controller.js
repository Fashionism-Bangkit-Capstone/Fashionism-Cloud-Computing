const db = require('../models');
const config = require('../config/google_cloud.config');
const constants = require('../utils/constants.utils');

const Product = db.product;
const UserAccount = db.user_account;

exports.index = async (req, res) => {
  const { user_account_id } = req.params;

  try {
    const userAccount = await UserAccount.findByPk(user_account_id);
    if (!userAccount) {
      return res.status(404).send({
        error: true,
        message: `User account with id ${user_account_id} not found`,
      });
    }

    const products = await userAccount.getFavorites();

    const results = await Promise.all(
      products.map(async (product) => {
        const msmeName = await db.getMsmeName(product.msme_account_id);
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          stock: product.stock,
          price: `IDR ${product.price.toLocaleString()}`,
          product_image: `${constants.bucketPublicUrl}/${config.bucketName}/${constants.productImageFolderName}/${product.product_image}`,
          category_id: product.category_id,
          msme_name: msmeName,
        };
      }),
    );

    res.status(200).send({
      error: false,
      data: results,
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.addFavorite = async (req, res) => {
  const { user_account_id, product_id } = req.body;

  try {
    const userAccount = await UserAccount.findByPk(user_account_id);
    if (!userAccount) {
      return res.status(404).send({
        error: true,
        message: `User account with id ${user_account_id} not found`,
      });
    }

    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).send({
        error: true,
        message: `Product with id ${product_id} not found`,
      });
    }

    await userAccount.addFavorite(product);
    res.status(200).send({
      error: false,
      message: 'Product has been added to favorites',
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.removeFavorite = async (req, res) => {
  const { user_account_id, product_id } = req.body;

  try {
    const userAccount = await UserAccount.findByPk(user_account_id);
    if (!userAccount) {
      return res.status(404).send({
        error: true,
        message: `User account with id ${user_account_id} not found`,
      });
    }

    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).send({
        error: true,
        message: `Product with id ${product_id} not found`,
      });
    }

    await userAccount.removeFavorite(product);
    res.status(200).send({
      error: false,
      message: 'Product has been removed from favorites',
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.isFavorite = async (req, res) => {
  const { user_account_id, product_id } = req.params;

  try {
    const userAccount = await UserAccount.findByPk(user_account_id);
    if (!userAccount) {
      return res.status(404).send({
        error: true,
        message: `User account with id ${user_account_id} not found`,
      });
    }

    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).send({
        error: true,
        message: `Product with id ${product_id} not found`,
      });
    }

    const isFavorite = await userAccount.hasFavorite(product);

    if (!isFavorite) {
      return res.status(404).send({
        error: true,
        data: isFavorite,
      });
    }

    res.status(200).send({
      error: false,
      data: isFavorite,
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};
