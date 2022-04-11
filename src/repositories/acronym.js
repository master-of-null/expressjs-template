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

const getCount = async (column, operator, value) => {
  const hasValidWhereClause =
    typeof column === 'string' &&
    typeof operator === 'string' &&
    typeof value === 'string'

  const { count } = await Acronyms()
    .count('*')
    .modify((queryBuilder) => {
      if (hasValidWhereClause) queryBuilder.where(column, operator, value)
    })
    .first()

  return count
}

const getAcronyms = async (search = '', offset = 0, limit = 10) => {
  const res = await Acronyms()
    .where('value', 'ilike', `%${search}%`)
    .offset(offset)
    .limit(limit)
  return res.map(mapAcronym)
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
