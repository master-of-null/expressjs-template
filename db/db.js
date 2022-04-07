// eslint-disable-next-line import/order
const Knex = require('knex')
const knexfile = require('./knexfile')

const db = Knex(knexfile[process.env.NODE_ENV])

module.exports = db
