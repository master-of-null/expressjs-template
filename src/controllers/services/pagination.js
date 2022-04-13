const setPaginationHeaders = (res, { count, limit, offset }) => {
  const pageCount = Math.ceil(Number(count) / Number(limit))
  const nextOffset = Number(limit) + Number(offset)

  // TODO: do a test where offset is greater than the count
  res.set('X-Paging-PageCount', pageCount)
  res.set('X-Paging-PageSize', limit)
  res.set('X-Paging-TotalRecordCount', count)
  res.set('X-Paging-NextOffset', nextOffset >= count ? null : nextOffset)
}

module.exports = {
  setPaginationHeaders
}
