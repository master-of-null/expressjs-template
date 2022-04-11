const express = require('express')
const {
  createAcronym,
  getAcronyms,
  updateAcronym,
  deleteAcronym
} = require('../../controllers/acronyms')
const validate = require('../../middlewares/validate')
const authenticate = require('../../middlewares/auth')
const acronymSchemas = require('./schemas/acronyms')

const router = express.Router()

router
  .route('/')
  .get(validate(acronymSchemas.getAcronyms), getAcronyms)
  .post(validate(acronymSchemas.createAcronym), createAcronym)

router
  .route('/:acronym')
  .put(authenticate, validate(acronymSchemas.updateAcronym), updateAcronym)
  .delete(authenticate, deleteAcronym)

module.exports = router
