const httpStatus = require('http-status')
const Joi = require('joi')
const ApiError = require('../lib/errors/ApiError')

const schemaOptions = {
  abortEarly: false,
  // TODO: write Ramda#pick type function to give better feedback
  stripUnknown: true
}

const validate = (schema) => (req, res, next) => {
  const { params, query, body } = req
  const { error } = Joi.compile(schema).validate(
    { params, query, body },
    schemaOptions
  )
  if (error) {
    const errorMsg = error.details.map(({ message }) => message).join(', ')
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMsg))
  }
  next()
}

module.exports = validate
