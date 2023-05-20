require('dotenv').config();

const env = (key, defaultValue = null) => {
  let value = process.env[key];

  if (defaultValue !== null) {
    value = defaultValue;
  }

  return value;
};

module.exports = env;
