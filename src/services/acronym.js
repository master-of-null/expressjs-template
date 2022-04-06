const db = require('../../db/db')

const create = async (value, description) => {
  return await db('acronyms').insert({ value, description })
}

const getCount = async () => {
  return await db.count('*').from('acronyms').first()
}

const getAcronyms = async (offset = 0, limit = 10) => {
  return await db.select('*').from('acronyms').offset(offset).limit(limit)
}

module.exports = {
  create,
  getCount,
  getAcronyms
}
