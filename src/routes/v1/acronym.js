const express = require('express')
const {
  createAcronym,
  getAcronyms,
  updateAcronym
} = require('../../controllers/acronyms')

const router = express.Router()

router.route('/').get(getAcronyms).post(createAcronym)

router.route('/:acronym').put(updateAcronym)

module.exports = router
