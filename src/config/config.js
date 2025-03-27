require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../database.sqlite'),
    logging: false
  },
  test: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../database.test.sqlite'),
    logging: false
  },
  production: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../database.sqlite'),
    logging: false
  }
};