const pino = require('pino')
const config = require('../config')

const base = {}
const isDevelopmentMode = config.env === 'development'

module.exports = pino({
  base,
  level: isDevelopmentMode ? 'debug' : 'info',
  enabled: config.env !== 'test'
})
