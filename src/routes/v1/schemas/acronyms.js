const Joi = require('joi')

const createAcronym = {
  body: Joi.object().keys({
    value: Joi.string().required(),
    description: Joi.string().required()
  })
}

const getAcronyms = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    from: Joi.number().integer(),
    search: Joi.string()
  })
}

const updateAcronym = {
  params: Joi.object().keys({
    acronym: Joi.string().required()
  }),
  body: Joi.object().keys({
    description: Joi.string().required()
  })
}

module.exports = {
  createAcronym,
  getAcronyms,
  updateAcronym
}
