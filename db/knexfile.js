const config = require('../src/config/config')
// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: config.databaseUrl,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/migrations`
    },
    seeds: {
      directory: `${__dirname}/seeds`
    }
  },
  test: {
    client: 'pg',
    connection: 'postgres://postgres:null@localhost:5432/test_express_database',
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/migrations`
    },
    seeds: {
      directory: `${__dirname}/seeds`
    }
  }
}
