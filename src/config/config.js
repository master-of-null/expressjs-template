const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '../../.envrc') })

export default {
  PORT: process.env.PORT
}
