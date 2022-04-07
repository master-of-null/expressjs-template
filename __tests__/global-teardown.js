const db = require('../db/db')

// TODO: I think I can move this to knexConfig.connection.database for both this file and setup file
const TEST_DB = 'test_express_database'

const dropDatabase = async () => {
  try {
    await db.raw(`DROP DATABASE IF EXISTS ${TEST_DB}`)
  } finally {
    await db.destroy()
  }
}

module.exports = async () => {
  try {
    await dropDatabase()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
