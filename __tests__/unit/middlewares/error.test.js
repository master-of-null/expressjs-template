const ApiError = require('../../../src/lib/errors/ApiError')
const {
  errorConverter,
  errorHandler
} = require('../../../src/middlewares/error')

describe('Error Middlewares', () => {
  describe('Error Converter', () => {
    it('should convert any non ApiError to ApiError', () => {
      // arrange
      const nextMock = jest.fn()

      // act
      errorConverter(new Error('Some Random Error'), {}, {}, nextMock)
      const convertedError = nextMock.mock.calls[0][0]

      // assert
      expect(convertedError).toBeInstanceOf(ApiError)
      expect(convertedError.statusCode).toBe(500)
      expect(convertedError.message).toBe('Internal Server Error')
      expect(convertedError.stack).toMatch(/Some Random Error/)
    })

    it('should maintain ApiError', () => {
      const nextMock = jest.fn()
      const testApiError = new ApiError(419, 'abort abort')
      errorConverter(testApiError, {}, {}, nextMock)

      const errorAfterConverter = nextMock.mock.calls[0][0]

      // assert referential identity is same
      expect(testApiError).toBe(errorAfterConverter)
    })
  })
  describe('Error Handler', () => {
    it('should appropriately send response', () => {
      // arrange
      let statusCode
      let response
      const testApiError = new ApiError(419, 'abort abort')
      const resMock = {
        locals: '',
        status: (code) => {
          statusCode = code
          return {
            send: (res) => {
              response = res
            }
          }
        }
      }

      // action
      errorHandler(testApiError, null, resMock)

      // assert
      expect(statusCode).toBe(419)
      expect(response).toEqual({ code: 419, message: 'abort abort' })
    })
  })
})
