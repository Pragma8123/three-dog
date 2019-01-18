require('dotenv').config(); // Load env variables
const knexConfig = require('./knexfile');
const knex = require('knex');

module.exports = knex(knexConfig[process.env.NODE_ENV || 'development']);
