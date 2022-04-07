const request = require('supertest')

const app = require('../../../../src/app')

describe('GET /v1/acronyms', () => {
  it('should return the specified limit of acronyms', async () => {
    // actions
    const res = await request(app).get('/v1/acronym?limit=10').expect(200)

    // assert
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    expect(res.body.results).toHaveLength(10)
  })

  it('should correct pagination headers in response', async () => {
    // actions
    const res = await request(app)
      .get('/v1/acronym?limit=10&from=21&search=b')
      .expect(200)

    // assert
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    expect(res.body.results).toHaveLength(10)
    expect(res.body.results[0]).toEqual({
      value: '1DR',
      description: 'I wonder'
    })

    expect(res.header).toHaveProperty('x-paging-nextoffset', '31')
    expect(res.header).toHaveProperty('x-paging-pagecount', '155')
    expect(res.header).toHaveProperty('x-paging-totalrecordcount', '1541')
    expect(res.header).toHaveProperty('x-paging-pagesize', '10')
  })

  it('should return the matched fuzzy search records', async () => {
    // actions
    const res = await request(app)
      .get('/v1/acronym?limit=10&from=21')
      .expect(200)

    // assert
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    expect(res.body.results).toHaveLength(10)
    expect(res.body.results[0]).toEqual({
      value: '1DR',
      description: 'I wonder'
    })

    expect(res.header).toHaveProperty('x-paging-nextoffset', '31')
    expect(res.header).toHaveProperty('x-paging-pagecount', '155')
    expect(res.header).toHaveProperty('x-paging-totalrecordcount', '1541')
    expect(res.header).toHaveProperty('x-paging-pagesize', '10')
  })
})
