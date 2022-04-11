const ApiError = require('../lib/errors/ApiError')

// abstract token verification
const isAuthorized = (token) => {
  return token.match(/valid/)
}

const authMiddleware = (req, res, next) => {
  const authToken = req.headers['x-api-key'] || ''
  if (isAuthorized(authToken)) {
    return next()
  }
  next(new ApiError(401, 'Invalid api key provided', true))
}

module.exports = authMiddleware
