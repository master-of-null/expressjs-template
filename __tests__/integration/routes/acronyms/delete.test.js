const request = require('supertest')
const { faker } = require('@faker-js/faker')

const db = require('../../../../db')
const app = require('../../../../src/app')

describe('DELETE /v1/acronyms', () => {
  const acronymParams = {
    value: faker.datatype.string(8).toUpperCase(),
    description: faker.lorem.sentence()
  }
  beforeAll(async () => {
    // setup
    await db('acronyms').insert(acronymParams)
  })

  it('should call auth middleware', async () => {
    // actions
    await request(app)
      .delete(`/v1/acronym/${encodeURIComponent(acronymParams.value)}`)
      .set('X-Api-Key', 'badToken')
      .expect(401)
    const dbItem = await db('acronyms').where(acronymParams).first()

    // assert
    expect(dbItem).toBeDefined()
  })

  it('should generate correct response and add acronym to database if done correctly', async () => {
    // actions
    await request(app)
      .delete(`/v1/acronym/${encodeURIComponent(acronymParams.value)}`)
      .set('X-Api-Key', 'validToken')
      .expect(204)
    const dbItem = await db('acronyms').where(acronymParams).first()

    // assert
    expect(dbItem).toBeUndefined()
  })

  // eslint-disable-next-line jest/expect-expect
  it('should throw 404 if no id param passed in url', async () => {
    // actions
    await request(app)
      .delete(`/v1/acronym/`)
      .set('X-Api-Key', 'validToken')
      .expect(404)
  })

  // eslint-disable-next-line jest/expect-expect
  it('should throw 404 if specified acronym does not exist', async () => {
    // actions
    await request(app)
      .delete(`/v1/acronym/a`)
      .set('X-Api-Key', 'validToken')
      .expect(404)
  })
})
