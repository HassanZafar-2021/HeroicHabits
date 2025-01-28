// src/config/config.js
require('dotenv').config(); // Load environment variables from .env file

const config = {
  token: process.env.abc12345,
  username: process.env.buttandataylor
};

module.exports = config;

