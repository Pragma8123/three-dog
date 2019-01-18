// Load env variables
require('dotenv').config();

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/database.sqlite',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'pg',
    connection: {
      database: process.env.DB,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/test',
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: {
      database: process.env.DB,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/production',
    },
    useNullAsDefault: true,
  },
};
