const logger = require('./logger');
const token = require('./token');

require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    TOKEN_KEY: process.env.TOKEN_KEY,
    token,
    logger
}