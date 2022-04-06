const acronymJson = require('./acronym.json')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const acronymSeedData = acronymJson.map((data) => {
  const [acronym, description] = Object.entries(data)[0]
  return {
    value: acronym,
    description
  }
})

const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('acronyms').truncate()
  await knex('acronyms').insert(acronymSeedData)
}

module.exports = { seed }
