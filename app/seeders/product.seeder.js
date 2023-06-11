const fs = require('fs');
const path = require('path').resolve('./app/seeders');
const { Storage } = require('@google-cloud/storage');
const db = require('../models');
const config = require('../config/google_cloud.config');
const constants = require('../utils/constants.utils');

const storage = new Storage({ keyFilename: config.keyFilename });
const bucket = storage.bucket(config.bucketName);

const Product = db.product;

const init = async () => {
  await Product.destroy({
    where: {},
  });
  await Product.sequelize.query('ALTER TABLE products AUTO_INCREMENT = 1');

  const [files] = await bucket.getFiles({
    prefix: `${constants.productImageFolderName}/`,
  });

  await Promise.all(
    files.map(async (file) => {
      await file.delete();
    }),
  );

  const products = JSON.parse(
    fs.readFileSync(`${path}/data/products.json`, 'utf8'),
  );

  await Promise.all(
    products.map(async (product) => {
      const folder = `${constants.productImageFolderName}/`;
      const ext = product.product_image.substring(
        product.product_image.lastIndexOf('.'),
        product.product_image.length,
      );
      const fileName = `${Math.random()
        .toString(36)
        .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}${ext}`;

      const blob = bucket.file(folder + fileName);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('error', (err) => console.log(err));

      blobStream.on('finish', async () => {
        try {
          await bucket.file(folder + fileName).makePublic();
        } catch (err) {
          console.log(err);
        }
      });

      blobStream.end(
        fs.readFileSync(`${path}/data/raw/products/${product.product_image}`),
      );

      await Product.create({
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: product.price,
        product_image: fileName,
        msme_account_id: product.msme_account_id,
        type_id: product.type_id,
        category_id: product.category_id,
      });
    }),
  );
};

module.exports = init;
