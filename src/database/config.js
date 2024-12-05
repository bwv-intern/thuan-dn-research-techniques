require('dotenv').config();
require('ts-node/register');

const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    port: 3306,
    dialect: 'mysql'
  }
};
