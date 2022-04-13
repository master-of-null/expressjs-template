// eslint-disable-next-line import/order
const Knex = require('knex')
const knexfile = require('./knexfile')
const config = require('../src/config')

const db = Knex(knexfile[config.env])

module.exports = db
