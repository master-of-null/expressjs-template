const acronymService = require('../services/acronym')

const createAcronym = async (req, res) => {
  const { value, description } = req.body
  await acronymService.createAcronym(value, description)
  res.send('Success!')
}

const getAcronyms = async (req, res) => {
  const { limit, from: offset } = req.query

  const { count } = await acronymService.getCount()
  const results = await acronymService.getAcronyms(offset, limit)

  res.send({ results, count })
}

const updateAcronym = async (req, res) => {
  const { acronym } = req.params
  const { description } = req.body
  await acronymService.updateAcronym(acronym, description)
  res.send('Success!')
}

const deleteAcronym = async (req, res) => {
  const { acronym } = req.params
  await acronymService.deleteAcronym(acronym)
  res.send('Success!')
}

module.exports = {
  createAcronym,
  getAcronyms,
  updateAcronym,
  deleteAcronym
}
