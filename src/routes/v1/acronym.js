const express = require('express')
const {
  createAcronym,
  getAcronyms,
  updateAcronym,
  deleteAcronym
} = require('../../controllers/acronyms')

const router = express.Router()

router.route('/').get(getAcronyms).post(createAcronym)

router.route('/:acronym').put(updateAcronym).delete(deleteAcronym)

module.exports = router
