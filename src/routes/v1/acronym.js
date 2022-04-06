const express = require('express')
const { createAcronym, getAcronyms } = require('../../controllers/acronyms')

const router = express.Router()

router.route('/').get(getAcronyms).post(createAcronym)

module.exports = router
