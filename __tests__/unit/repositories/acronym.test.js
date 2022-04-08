const { faker } = require('@faker-js/faker')
const db = require('../../../db/db')
const {
  createAcronym,
  getAcronyms,
  updateAcronym,
  deleteAcronym
} = require('../../../src/repositories/acronym')

describe('Acronym Repository', () => {
  describe('#createAcronym', () => {
    const expectedAcronym = {
      value: 'WOOHOO',
      description: "I'm excited"
    }

    it('should successfuly save an acronym', async () => {
      const res = await createAcronym('woohoo', expectedAcronym.description)
      expect(res).toEqual(expectedAcronym)

      const dbRecord = await db('acronyms').where(expectedAcronym).first()

      expect(dbRecord).toBeDefined()
    })

    it('should not overwrite existing acronym', async () => {
      await createAcronym(expectedAcronym.value, 'Someones excited')

      const dbRecord = await db('acronyms').where({
        value: expectedAcronym.value
      })

      expect(dbRecord).toHaveLength(2)
    })
  })

  describe('#getAcronyms', () => {
    it('should successfully retrieve default limit of acronyms', async () => {
      const acronyms = await getAcronyms()
      expect(acronyms).toHaveLength(10)

      // assert correct shape
      acronyms.map((acronym) =>
        expect(acronym).toContainAllKeys(['value', 'description'])
      )
    })
  })

  describe('#updateAcronym', () => {
    it('should successfully update an acronym', async () => {
      const updateAcronymParams = {
        value: 'B',
        description: 'described'
      }
      const wasUpdated = await updateAcronym(
        updateAcronymParams.value,
        updateAcronymParams.description
      )

      const dbRecord = await db('acronyms').where(updateAcronymParams).first()

      // assert correct shape
      expect(wasUpdated).toBe(true)
      expect(dbRecord).toBeDefined()
    })

    it('should return false when acronym does not exist', async () => {
      const wasUpdated = await updateAcronym(faker.datatype.string(10), 'hola')

      // assert correct shape
      expect(wasUpdated).toBe(false)
    })
  })

  describe('#deleteAcronym', () => {
    const deleteAcronymParams = {
      value: faker.datatype.string(8).toUpperCase(),
      description: 'described'
    }

    beforeAll(async () => {
      await db('acronyms').insert(deleteAcronymParams)
    })

    it('should successfully delete an acronym', async () => {
      const wasDeleted = await deleteAcronym(deleteAcronymParams.value)

      const dbRecord = await db('acronyms').where(deleteAcronymParams).first()

      // assert correct shape
      expect(wasDeleted).toBe(true)
      expect(dbRecord).toBeUndefined()
    })

    it('should return false when acronym does not exist', async () => {
      const wasDeleted = await deleteAcronym(faker.datatype.string(10))

      // assert correct shape
      expect(wasDeleted).toBe(false)
    })
  })
})
