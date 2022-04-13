const request = require('supertest')

const db = require('../../../../db/db')
const app = require('../../../../src/app')

describe('GET /v1/acronyms', () => {
  it('should return the specified limit of acronyms', async () => {
    // actions
    const res = await request(app).get('/v1/acronym?limit=10').expect(200)

    // assert
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    expect(res.body).toHaveLength(10)

    expect(res.header).toHaveProperty('x-paging-pagesize', '10')
    expect(res.header).toHaveProperty('x-paging-nextoffset', '10')
  })

  it('should correct pagination headers in response', async () => {
    const limit = 10
    const offset = 21
    const searchStr = 'b'
    // actions
    const res = await request(app)
      .get(`/v1/acronym?limit=${limit}&from=${offset}&search=${searchStr}`)
      .expect(200)
    // construct desired result query
    const fuzzyMatchClause = `value ilike '%${searchStr}%'`
    const { rows: dbRecords } = await db.raw(
      `SELECT value, description FROM acronyms WHERE ${fuzzyMatchClause} LIMIT ${limit} OFFSET ${offset}`
    )
    const { count: dbRecordCount } = await db('acronyms')
      .whereRaw(fuzzyMatchClause)
      .count()
      .first()

    // assert
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    expect(res.body).toHaveLength(10)
    expect(res.body[0]).toEqual(dbRecords[0])

    expect(res.header).toHaveProperty('x-paging-nextoffset', '31')
    expect(res.header).toHaveProperty('x-paging-pagesize', '10')
    expect(res.header).toHaveProperty(
      'x-paging-totalrecordcount',
      dbRecordCount
    )
  })

  it('should return the matched fuzzy search records', async () => {
    // actions
    const res = await request(app)
      .get('/v1/acronym?limit=10&from=21')
      .expect(200)

    // assert
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    expect(res.body).toHaveLength(10)
    expect(res.body[0]).toEqual({
      value: '1DR',
      description: 'I wonder'
    })
    const { count: dbRecordCount } = await db('acronyms').count().first()

    const expectedPageCount = Math.ceil(Number(dbRecordCount) / 10)

    expect(res.header).toHaveProperty('x-paging-pagesize', '10')
    expect(res.header).toHaveProperty('x-paging-nextoffset', '31')
    expect(res.header).toHaveProperty(
      'x-paging-pagecount',
      String(expectedPageCount)
    )
    expect(res.header).toHaveProperty(
      'x-paging-totalrecordcount',
      dbRecordCount
    )
  })
})
