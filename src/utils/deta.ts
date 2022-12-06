import type QueryString from 'qs'

// Action
declare class Action {
  readonly operation: ActionTypes;
  readonly value: any;
  constructor(action: ActionTypes, value?: any);
}

// Basic types
type BasicType = string | number | boolean;
type NullType = null;
type UndefinedType = undefined;
type ObjectType = {
  [key: string]: ObjectType | ArrayType | BasicType | NullType | UndefinedType | Action;
};
type ArrayType = Array<ArrayType | ObjectType | BasicType | NullType | UndefinedType>;
type CompositeType = ArrayType | ObjectType;

// Fetch options
interface FetchOptions {
  limit?: number;
  last?: string;
}

// Fetch response
enum ActionTypes {
  Set = "set",
  Trim = "trim",
  Increment = "increment",
  Append = "append",
  Prepend = "prepend"
}
interface FetchResponse {
  items: ObjectType[];
  count: number;
  last?: string;
}

// Base
interface Base {
  fetch(query?: CompositeType, options?: FetchOptions): Promise<FetchResponse>;
}

export const fetchByQuery = async (base: Base, query: QueryString.ParsedQs) => {
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