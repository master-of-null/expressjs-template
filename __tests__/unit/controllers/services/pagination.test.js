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
})
