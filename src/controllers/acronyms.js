const httpStatus = require('http-status')
const acronymService = require('../services/acronym')
const paginationService = require('./services/pagination')
const catchAsync = require('./services/catch-async')

const createAcronym = catchAsync(async (req, res) => {
  const { value, description } = req.body
  await acronymService.createAcronym(value, description)
  res.status(httpStatus.CREATED).send({ message: 'Success!' })
})

const getAcronyms = catchAsync(async (req, res) => {
  const { limit, from: offset } = req.query

  const count = await acronymService.getCount()
  const results = await acronymService.getAcronyms(offset, limit)

  paginationService.setPaginationHeaders(res, { count, limit, offset })
  res.send({ results, count })
})

const updateAcronym = catchAsync(async (req, res) => {
  const { acronym } = req.params
  const { description } = req.body
  await acronymService.updateAcronym(acronym, description)
  res.send('Success!')
})

const deleteAcronym = catchAsync(async (req, res) => {
  const { acronym } = req.params
  await acronymService.deleteAcronym(acronym)
  res.send('Success!')
})

module.exports = {
  createAcronym,
  getAcronyms,
  updateAcronym,
  deleteAcronym
}
