const pino = require('pino')
const config = require('../config/config')

const base = {}
const isDevelopmentMode = config.NODE_ENV === 'development'

module.exports = pino({
  base,
  level: isDevelopmentMode ? 'debug' : 'info',
  enabled: config.NODE_ENV !== 'test'
})
