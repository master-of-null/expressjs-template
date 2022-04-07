const request = require('supertest')
const { faker } = require('@faker-js/faker')
const db = require('../../../../db/db')
const app = require('../../../../src/app')

describe('PUT /v1/acronyms', () => {
  it('should properly update an acronym if updating description', async () => {
    // setup
    const acronymParams = {
      value: faker.datatype.string(8).toUpperCase(),
      description: faker.lorem.sentence()
    }
    await db('acronyms').insert(acronymParams)

    // actions
    await request(app)
      .put(`/v1/acronym/${acronymParams.value}`)
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
      .expect(404)
  })
})
