const express = require('express')
const {
  createAcronym,
  getAcronyms,
  updateAcronym,
  deleteAcronym
} = require('../../controllers/acronyms')
const validate = require('../../middlewares/validate')
const acronymSchemas = require('./schemas/acronyms')

const router = express.Router()

router
  .route('/')
  .get(validate(acronymSchemas.getAcronyms), getAcronyms)
  .post(validate(acronymSchemas.createAcronym), createAcronym)

router
  .route('/:acronym')
  .put(validate(acronymSchemas.updateAcronym), updateAcronym)
  .delete(deleteAcronym)

module.exports = router
