const express = require('express')
const acronymRoute = require('./acronym')

const router = express.Router()

const routes = [
  {
    path: '/acronym',
    route: acronymRoute
  }
]

routes.forEach(({ path, route }) => {
  router.use(path, route)
})

module.exports = router
