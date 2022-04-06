const acronymService = require('../services/acronym')

const createAcronym = async (req, res) => {
  const { value, description } = req.body
  await acronymService.create(value, description)
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
  await acronymService.update(acronym, description)
  res.send('Success!')
}

module.exports = {
  createAcronym,
  getAcronyms,
  updateAcronym
}
