const setPaginationHeaders = (res, pageParams) => {
  let { count, limit, offset } = pageParams
  count = Number(count)
  limit = Number(limit)
  offset = Number(offset)
  const pageCount = Math.ceil(count / limit)
  const nextOffset = limit + offset

  // TODO: do a test where offset is greater than the count
  res.set('X-Paging-PageCount', pageCount)
  res.set('X-Paging-PageSize', limit)
  res.set('X-Paging-TotalRecordCount', count)
  res.set('X-Paging-NextOffset', nextOffset)
}

module.exports = {
  setPaginationHeaders
}
