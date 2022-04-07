// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'expressjs',
      user: 'postgres',
      password: null
    },
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
    connection: {
      user: 'postgres',
      password: null
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/migrations`
    },
    seeds: {
      directory: `${__dirname}/seeds`
    }
  }
}
