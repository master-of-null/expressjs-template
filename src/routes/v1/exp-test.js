const express = require('express')
const logger = require('../../lib/logger')

const router = express.Router()

/** @type {import("express").RequestHandler} */
const say = (word) => (req, res, next) => {
  logger.info(word)
  next()
}

const respond = (req, res) => {
  res.send('Great Success!')
}

router.route('/').get(say('one'), say('two'), respond)

module.exports = router
