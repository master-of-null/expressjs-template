const express = require('express')
const testRoute = require('./exp-test')

const router = express.Router()

const routes = [
  {
    path: '/exp-test',
    route: testRoute
  }
]

routes.forEach(({ path, route }) => {
  router.use(path, route)
})

module.exports = router
