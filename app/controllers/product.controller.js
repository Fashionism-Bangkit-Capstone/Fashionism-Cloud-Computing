const { Storage } = require('@google-cloud/storage');
const db = require('../models');
const config = require('../config/google_cloud.config');
const constants = require('../utils/constants.utils');

const storage = new Storage({ keyFilename: config.keyFilename });
const bucket = storage.bucket(config.bucketName);

const Product = db.product;

exports.index = async (req, res) => {
  const { msme_account_id } = req.params;

  try {
    const products = await Product.findAll({
      where: {
        msme_account_id,
      },
    });

    const results = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: `IDR ${product.price.toLocaleString()}`,
      product_image: `${constants.bucketPublicUrl}/${config.bucketName}/${constants.productImageFolderName}/${product.product_image}`,
      type_id: product.type_id,
      category_id: product.category_id,
    }));

    return res.status(200).send({
      error: false,
      data: results,
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.store = async (req, res) => {
  const { msme_account_id } = req.params;
  const { name, description, stock, price, type_id, category_id } = req.body;

  try {
    if (!req.file) {
      return res.status(422).send({
        error: true,
        message: 'Product image cannot be empty.',
      });
    }

    const folder = `${constants.productImageFolderName}/`;
    const ext = req.file.originalname.substring(
      req.file.originalname.lastIndexOf('.'),
      req.file.originalname.length,
    );
    const fileName = `${Math.random()
      .toString(36)
      .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}${ext}`;

    const blob = bucket.file(folder + fileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err) => {
      res.status(500).send({ error: true, message: err.message });
    });

    blobStream.on('finish', async () => {
      try {
        await bucket.file(folder + fileName).makePublic();
      } catch (err) {
        return res.status(500).send({ error: true, message: err.message });
      }
    });

    blobStream.end(req.file.buffer);

    const product = await Product.create({
      name,
      description,
      stock,
      price,
      msme_account_id,
      type_id,
      category_id,
      product_image: fileName,
    });

    return res.status(201).send({
      error: false,
      message: 'Product created successfully!',
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: `IDR ${product.price.toLocaleString()}`,
        product_image: `${constants.bucketPublicUrl}/${config.bucketName}/${constants.productImageFolderName}/${product.product_image}`,
        type_id: product.type_id,
        category_id: product.category_id,
      },
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.show = async (req, res) => {
  const { msme_account_id, id } = req.params;

  try {
    const product = await Product.findOne({
      where: {
        id,
        msme_account_id,
      },
    });

    if (!product) {
      return res.status(404).send({ error: true, message: 'Not found.' });
    }

    return res.status(200).send({
      error: false,
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: `IDR ${product.price.toLocaleString()}`,
        product_image: `${constants.bucketPublicUrl}/${config.bucketName}/${constants.productImageFolderName}/${product.product_image}`,
        type_id: product.type_id,
        category_id: product.category_id,
      },
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.update = async (req, res) => {
  const { msme_account_id, id } = req.params;
  const { name, description, stock, price, type_id, category_id } = req.body;

  try {
    const product = await Product.findOne({
      where: {
        id,
        msme_account_id,
      },
    });

    if (!product) {
      return res.status(404).send({ error: true, message: 'Not found.' });
    }

    await product.update({
      name,
      description,
      stock,
      price,
      type_id,
      category_id,
    });

    if (req.file) {
      const folder = `${constants.productImageFolderName}/`;
      const ext = req.file.originalname.substring(
        req.file.originalname.lastIndexOf('.'),
        req.file.originalname.length,
      );
      const fileName = `${Math.random()
        .toString(36)
        .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}${ext}`;

      const blob = bucket.file(folder + fileName);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('error', (err) => {
        res.status(500).send({ error: true, message: err.message });
      });

      blobStream.on('finish', async () => {
        try {
          await bucket.file(folder + fileName).makePublic();
        } catch (err) {
          return res.status(500).send({ error: true, message: err.message });
        }
      });

      blobStream.end(req.file.buffer);
      const oldProductImage = product.product_image;
      if (oldProductImage) {
        const oldBlob = bucket.file(folder + oldProductImage);
        await oldBlob.delete();
      }

      await product.update(
        {
          product_image: fileName,
        },
        {
          where: {
            id,
          },
        },
      );
    }

    return res.status(200).send({
      error: false,
      message: 'Product updated successfully!',
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.destroy = async (req, res) => {
  const { msme_account_id, id } = req.params;

  try {
    const product = await Product.findOne({
      where: {
        id,
        msme_account_id,
      },
    });

    if (!product) {
      return res.status(404).send({ error: true, message: 'Not found.' });
    }

    const folder = `${constants.productImageFolderName}/`;
    const productImage = product.product_image;
    if (productImage) {
      const blob = bucket.file(folder + productImage);
      await blob.delete();
    }

    await product.destroy();

    return res.status(200).send({
      error: false,
      message: 'Product deleted successfully!',
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.getTotalProducts = async (req, res) => {
  const { msme_account_id } = req.params;

  try {
    const totalProducts = await Product.count({
      where: {
        msme_account_id,
      },
    });

    return res.status(200).send({
      error: false,
      data: {
        total_products: totalProducts,
      },
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.getRecentProducts = async (req, res) => {
  const { msme_account_id } = req.params;

  try {
    const recentProducts = await Product.count({
      where: {
        msme_account_id,
        created_at: {
          [db.Sequelize.Op.gte]: new Date(
            new Date().setDate(new Date().getDate() - 1),
          ),
        },
      },
    });

    return res.status(200).send({
      error: false,
      data: {
        recent_products: recentProducts,
      },
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.getProductsByType = async (req, res) => {
  const { msme_account_id, type_id } = req.params;

  try {
    const products = await Product.findAll({
      where: {
        msme_account_id,
        type_id,
      },
    });

    if (!products) {
      return res.status(404).send({ error: true, message: 'Not found.' });
    }

    const results = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: `IDR ${product.price.toLocaleString()}`,
      product_image: `${constants.bucketPublicUrl}/${config.bucketName}/${constants.productImageFolderName}/${product.product_image}`,
      type_id: product.type_id,
      category_id: product.category_id,
    }));

    return res.status(200).send({
      error: false,
      data: results,
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  const { msme_account_id, category_id } = req.params;

  try {
    const products = await Product.findAll({
      where: {
        msme_account_id,
        category_id,
      },
    });

    if (!products) {
      return res.status(404).send({ error: true, message: 'Not found.' });
    }

    const results = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: `IDR ${product.price.toLocaleString()}`,
      product_image: `${constants.bucketPublicUrl}/${config.bucketName}/${constants.productImageFolderName}/${product.product_image}`,
      type_id: product.type_id,
      category_id: product.category_id,
    }));

    return res.status(200).send({
      error: false,
      data: results,
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.getProductsByCategoryOnUser = async (req, res) => {
  const { category_id } = req.params;

  try {
    const products = await Product.findAll({
      where: {
        category_id,
      },
    });

    if (!products) {
      return res.status(404).send({ error: true, message: 'Not found.' });
    }

    const results = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: `IDR ${product.price.toLocaleString()}`,
      product_image: `${constants.bucketPublicUrl}/${config.bucketName}/${constants.productImageFolderName}/${product.product_image}`,
      category_id: product.category_id,
    }));

    return res.status(200).send({
      error: false,
      data: results,
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.getProductOnUser = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send({ error: true, message: 'Not found.' });
    }

    return res.status(200).send({
      error: false,
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: `IDR ${product.price.toLocaleString()}`,
        product_image: `${constants.bucketPublicUrl}/${config.bucketName}/${constants.productImageFolderName}/${product.product_image}`,
        category_id: product.category_id,
      },
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

exports.getAllProductsOnUser = async (req, res) => {
  try {
    const products = await Product.findAll();

    if (!products) {
      return res.status(404).send({ error: true, message: 'Not found.' });
    }

    const results = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: `IDR ${product.price.toLocaleString()}`,
      product_image: `${constants.bucketPublicUrl}/${config.bucketName}/${constants.productImageFolderName}/${product.product_image}`,
      category_id: product.category_id,
    }));

    return res.status(200).send({
      error: false,
      data: results,
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};
