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

module.exports = {
  createAcronym,
  getAcronyms
}
