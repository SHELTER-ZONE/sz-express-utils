import type Base from 'deta/dist/types/base'
import type QueryString from 'qs'

export const fetchByQuery = async(base: Base, query: QueryString.ParsedQs) => {
  // Get the limit and last values from the query string
  const limit = query.limit ? Number(query.limit) : 10
  const last = query.last?.toString() ?? undefined

  // Remove the limit and last values from the query string
  const data = query
  delete data.limit
  delete data.last

  // Fetch the data base
  return await base.fetch(data, { limit, last })
}