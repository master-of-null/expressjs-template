const request = require('supertest')
const { faker } = require('@faker-js/faker')
const db = require('../../../../db/db')
const app = require('../../../../src/app')

describe('Acronyms Endpoints', () => {
  describe('POST /v1/acronyms', () => {
    it('should generate correct response and add acronym to database if done correctly', async () => {
      // setup
      const acronymParams = {
        value: faker.datatype.string(8).toUpperCase(),
        description: faker.lorem.sentence()
      }

      // actions
      const res = await request(app)
        .post('/v1/acronym')
        .send(acronymParams)
        .expect(201)
      const dbItem = await db('acronyms').where(acronymParams).first()

      // assert
      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8'
      )
      expect(dbItem).toBeDefined()
    })

    it('should throw error if missing an expected parameter', async () => {
      // actions
      const noValueResponse = await request(app)
        .post('/v1/acronym')
        .send({ description: 'something' })
        .expect(400)

      expect(noValueResponse.body).toHaveProperty(
        'message',
        '"body.value" is required'
      )

      const noDescriptionResponse = await request(app)
        .post('/v1/acronym')
        .send({ value: 'something', description: '' })
        .expect(400)

      expect(noDescriptionResponse.body).toHaveProperty(
        'message',
        '"body.description" is not allowed to be empty'
      )
    })
  })

  describe('GET /v1/acronyms', () => {
    it('should generate correct response and add acronym to database if done correctly', async () => {
      // setup
      const acronymParams = {
        value: faker.datatype.string().toUpperCase(),
        description: faker.lorem.sentence()
      }

      // actions
      const res = await request(app)
        .post('/v1/acronym')
        .send(acronymParams)
        .expect(201)
      const dbItem = await db('acronyms').where(acronymParams).first()

      // assert
      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8'
      )
      expect(dbItem).toBeDefined()
    })

    it('should throw error if missing an expected parameter', async () => {
      // actions
      const noValueResponse = await request(app)
        .post('/v1/acronym')
        .send({ description: 'something' })
        .expect(400)

      expect(noValueResponse.body).toHaveProperty(
        'message',
        '"body.value" is required'
      )

      const noDescriptionResponse = await request(app)
        .post('/v1/acronym')
        .send({ value: 'something', description: '' })
        .expect(400)

      expect(noDescriptionResponse.body).toHaveProperty(
        'message',
        '"body.description" is not allowed to be empty'
      )
    })
  })
})
