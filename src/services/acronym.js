const db = require('../../db/db')

const Acronyms = () => db('acronyms')

const createAcronym = async (value, description) => {
  return await Acronyms().insert({
    value: value.toUpperCase(),
    description
  })
}

const getCount = async () => {
  return await db.count('*').from('acronyms').first()
}

const getAcronyms = async (offset = 0, limit = 10) => {
  return await db.select('*').from('acronyms').offset(offset).limit(limit)
}

const updateAcronym = async (value, description) => {
  // TODO: cleanup for one DB call instead of two
  const acronymDb = Acronyms()
  const { id } = await acronymDb.where({ value }).first()
  await acronymDb.where({ id }).update({ value, description })
}

const deleteAcronym = async (value) => {
  // TODO: cleanup for one DB call instead of two
  const acronymDb = Acronyms()
  const { id } = await acronymDb.where({ value }).first()
  await acronymDb.where({ id }).del()
}

module.exports = {
  createAcronym,
  getCount,
  getAcronyms,
  updateAcronym,
  deleteAcronym
}
