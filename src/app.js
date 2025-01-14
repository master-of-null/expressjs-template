const express = require('express')
const helmet = require('helmet')
const httpStatus = require('http-status')
const pinoHTTP = require('pino-http')
const routes = require('./routes/v1')
const logger = require('./lib/logger')
const { errorConverter, errorHandler } = require('./middlewares/error')
const ApiError = require('./lib/errors/ApiError')

const app = express()
// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// add pinoHTTP middleware
app.use(pinoHTTP({ logger }))

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// v1 api routes
app.use('/v1', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

module.exports = app
