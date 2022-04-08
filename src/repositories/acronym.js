const db = require('../../db/db')

const Acronyms = () => db('acronyms')

const mapAcronym = (dbRow) => {
  return {
    value: dbRow.value,
    description: dbRow.description
  }
}

const createAcronym = async (value, description) => {
  return await Acronyms()
    .returning(['value', 'description'])
    .insert({
      value: value.toUpperCase(),
      description
    })
    .then(([acronym]) => acronym)
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
  const acronymVal = value.toUpperCase()

  // TODO: cleanup for one DB call instead of two
  const acronymDb = Acronyms()
  const record = await acronymDb.where({ value: acronymVal }).first()

  if (!record) return false

  await acronymDb
    .where({ id: record.id })
    .update({ value: acronymVal, description })
  return true
}

const deleteAcronym = async (value) => {
  // TODO: cleanup for one DB call instead of two
  const acronymDb = Acronyms()
  const record = await acronymDb.where({ value: value.toUpperCase() }).first()

  if (!record) return false

  await acronymDb.where({ id: record.id }).del()
  return true
}

module.exports = {
  createAcronym,
  getCount,
  getAcronyms,
  updateAcronym,
  deleteAcronym
}
