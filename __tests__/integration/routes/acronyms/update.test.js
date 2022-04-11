const request = require('supertest')
const { faker } = require('@faker-js/faker')
const db = require('../../../../db/db')
const app = require('../../../../src/app')

describe('PUT /v1/acronyms', () => {
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
      .put(`/v1/acronym/${encodeURIComponent(acronymParams.value)}`)
      .set('X-Api-Key', 'badToken')
      .expect(401)
    const dbItem = await db('acronyms').where(acronymParams).first()

    // assert
    expect(dbItem).toBeDefined()
  })

  it('should properly update an acronym if updating description', async () => {
    const testStartDateTime = new Date()

    // actions
    await request(app)
      .put(`/v1/acronym/${encodeURIComponent(acronymParams.value)}`)
      .set('X-Api-Key', 'validToken')
      .send({
        description: 'updated acronym'
      })
      .expect(204)
    const dbItem = await db('acronyms')
      .where({ value: acronymParams.value })
      .first()

    // assert
    expect(dbItem).toBeDefined()
    expect(dbItem).toHaveProperty('description', 'updated acronym')
    expect(dbItem.updated_at).toBeAfter(testStartDateTime)
  })

  // eslint-disable-next-line jest/expect-expect
  it('should throw 404 if no id param passed in url', async () => {
    // actions
    await request(app).put(`/v1/acronym/`).expect(404)
  })

  // eslint-disable-next-line jest/expect-expect
  it('should throw 404 if specified acronym does not exist', async () => {
    // actions
    await request(app)
      .put(`/v1/acronym/a`)
      .send({
        description: 'yolo'
      })
      .set('X-Api-Key', 'validToken')
      .expect(404)
  })
})
