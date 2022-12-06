import type Base from 'deta/dist/types/base'
import type QueryString from 'qs'

export const fetchByQuery = async(base: Base, query: QueryString.ParsedQs) => {
  // Get the limit and last values from the query string
  const limit = query.limit ? Number(query.limit) : 10
  delete query.limit
  const last = query.last?.toString() ?? undefined
  delete query.last

  // Fetch the data base
  return await base.fetch(query, { limit, last })
}