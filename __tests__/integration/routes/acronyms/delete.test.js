const request = require('supertest')
const { faker } = require('@faker-js/faker')
const db = require('../../../../db/db')
const app = require('../../../../src/app')

describe('DELETE /v1/acronyms', () => {
  it('should generate correct response and add acronym to database if done correctly', async () => {
    // setup
    const acronymParams = {
      value: faker.datatype.string(8).toUpperCase(),
      description: faker.lorem.sentence()
    }
    await db('acronyms').insert(acronymParams)

    // actions
    await request(app).delete(`/v1/acronym/${acronymParams.value}`).expect(204)
    const dbItem = await db('acronyms').where(acronymParams).first()

    // assert
    expect(dbItem).toBeUndefined()
  })

  // eslint-disable-next-line jest/expect-expect
  it('should throw 404 if no id param passed in url', async () => {
    // actions
    await request(app).delete(`/v1/acronym/`).expect(404)
  })

  // eslint-disable-next-line jest/expect-expect
  it('should throw 404 if specified acronym does not exist', async () => {
    // actions
    await request(app).delete(`/v1/acronym/a`).expect(404)
  })
})
