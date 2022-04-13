const Knex = require('knex')
const knexConfig = require('../db/knexfile')

const TEST_DB = 'test_express_database'

// Create the database
const createTestDatabase = async () => {
  const knex = Knex({
    ...knexConfig.test,
    connection: 'postgres://postgres:null@localhost:5432'
  })

  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${TEST_DB}`)
    await knex.raw(`CREATE DATABASE ${TEST_DB}`)
  } catch (error) {
    throw new Error(error)
  } finally {
    await knex.destroy()
  }
}

// Seed the database with schema and data
const seedTestDatabase = async () => {
  const knex = Knex(knexConfig.test)

  try {
    await knex.migrate.latest()
    await knex.seed.run()
  } catch (error) {
    throw new Error(error)
  } finally {
    await knex.destroy()
  }
}

module.exports = async () => {
  try {
    await createTestDatabase()
    await seedTestDatabase()
    console.log('Test database created successfully')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
