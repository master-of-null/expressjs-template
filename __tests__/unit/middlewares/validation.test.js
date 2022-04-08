const Joi = require('joi')
const ApiError = require('../../../src/lib/errors/ApiError')
const validate = require('../../../src/middlewares/validate')

describe('Validate middleware', () => {
  const schema = {
    body: Joi.object().keys({
      str: Joi.string().required(),
      num: Joi.number()
    })
  }

  it('should pass on valid Schema', () => {
    const payload = { body: { str: 'YOLO' } }
    const validator = validate(schema)
    const nextMock = jest.fn()

    validator(payload, {}, nextMock)
    expect(nextMock.mock.calls[0][0]).toBeUndefined()
  })

  it('should throw ApiError, as expected, for invalid datatype in schema', () => {
    const payload = { body: { str: 'YOLO', num: 'Not Number' } }
    const validator = validate(schema)
    const nextMock = jest.fn()

    validator(payload, {}, nextMock)
    expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ApiError)
  })
})
