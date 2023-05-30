const Multer = require('multer');

const processFile = Multer({
  storage: Multer.memoryStorage(),
});

module.exports = processFile;
