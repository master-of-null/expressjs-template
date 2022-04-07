const db = require('../../db/db')

const Acronyms = () => db('acronyms')

const mapAcronym = (dbRow) => {
  return {
    value: dbRow.value,
    description: dbRow.description
  }
}

const createAcronym = async (value, description) => {
  return await Acronyms().insert({
    value: value.toUpperCase(),
    description
  })
}

const getCount = async () => {
  return await db
    .count('*')
    .from('acronyms')
    .first()
    .then(({ count }) => count)
}

const getAcronyms = async (offset = 0, limit = 10) => {
  return await db
    .select('*')
    .from('acronyms')
    .offset(offset)
    .limit(limit)
    .then((acronyms) => acronyms.map(mapAcronym))
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
