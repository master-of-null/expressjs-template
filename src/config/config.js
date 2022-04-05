const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '../../.envrc') })

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT
}
