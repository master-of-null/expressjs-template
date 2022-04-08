const httpStatus = require('http-status')
const acronymService = require('../repositories/acronym')
const paginationService = require('./services/pagination')
const catchAsync = require('./services/catch-async')

const createAcronym = catchAsync(async (req, res) => {
  const { value, description } = req.body
  await acronymService.createAcronym(value, description)
  res.status(httpStatus.CREATED).send({ message: 'Success!' })
})

const getAcronyms = catchAsync(async (req, res) => {
  const { limit, from: offset, search } = req.query

  const count = await acronymService.getCount()
  const results = await acronymService.getAcronyms(search, offset, limit)

  paginationService.setPaginationHeaders(res, { count, limit, offset })
  res.send({ results, count })
})

const updateAcronym = catchAsync(async (req, res) => {
  const { acronym } = req.params
  const { description } = req.body
  const wasUpdated = await acronymService.updateAcronym(acronym, description)

  if (wasUpdated) {
    res.status(httpStatus.NO_CONTENT).send('Success!')
  } else {
    res.status(httpStatus.NOT_FOUND).send()
  }
})

const deleteAcronym = catchAsync(async (req, res) => {
  const { acronym } = req.params
  const wasDeleted = await acronymService.deleteAcronym(acronym)
  if (wasDeleted) {
    res.status(httpStatus.NO_CONTENT).send('Success!')
  } else {
    res.status(httpStatus.NOT_FOUND).send()
  }
})

module.exports = {
  createAcronym,
  getAcronyms,
  updateAcronym,
  deleteAcronym
}
