const db = require('../../db/db')

const createAcronym = async (req, res) => {
  const { value, description } = req.body
  await db('acronyms').insert({ value, description })
  res.send('Success!')
}

module.exports = {
  createAcronym
}
