const {
  setPaginationHeaders
} = require('../../../../src/controllers/services/pagination')

describe('setPaginationHeaders', () => {
  it('should correctly calculate page data', () => {
    const state = {}
    const mock = {
      set: (key, value) => {
        state[key] = value
      }
    }

    setPaginationHeaders(mock, { count: 937, limit: 12, offset: 2 })

    expect(state).toHaveProperty('X-Paging-PageCount', 79)
    expect(state).toHaveProperty('X-Paging-TotalRecordCount', 937)
    expect(state).toHaveProperty('X-Paging-NextOffset', 14)
    expect(state).toHaveProperty('X-Paging-PageSize', 12)
  })

  it('should correctlys calculate page data', () => {
    const state = {}
    const mock = {
      set: (key, value) => {
        state[key] = value
      }
    }

    setPaginationHeaders(mock, { count: 9, limit: 12, offset: 21 })

    expect(state).toHaveProperty('X-Paging-PageCount', 1)
    expect(state).toHaveProperty('X-Paging-TotalRecordCount', 9)
    expect(state).toHaveProperty('X-Paging-NextOffset', null)
    expect(state).toHaveProperty('X-Paging-PageSize', 12)
  })
})
