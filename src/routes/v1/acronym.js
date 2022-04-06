const express = require('express')
const logger = require('../../lib/logger')
const { createAcronym } = require('../../controllers/acronyms')

const router = express.Router()

/** @type {import("express").RequestHandler} */
const say = (word) => (req, res, next) => {
  logger.info(word)
  next()
}

const respond = (req, res) => {
  res.send('Great Success!')
}

router.route('/').get(say('one'), say('two'), respond).post(createAcronym)

module.exports = router
