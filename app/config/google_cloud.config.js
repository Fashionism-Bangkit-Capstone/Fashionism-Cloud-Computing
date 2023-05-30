const env = require('../utils/env.utils');

module.exports = {
  keyFilename: env('GOOGLE_CLOUD_KEY_FILENAME'),
  bucketName: env('GOOGLE_CLOUD_BUCKET_NAME'),
};
