import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'
import { verify } from 'jsonwebtoken'
import { assert, Struct } from 'superstruct'
import { Schema as zSchema } from 'zod'

export const useReqDataValidate = () => {
  /**
   * 驗證請求攜帶的資料是否合法
   * @param model: joi model
   * @param dataFrom: 'query' | 'body'
   */
  const joiValidate = (model: ObjectSchema, dataFrom: 'query' | 'body') => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (dataFrom === 'query')
          req.query = await model.validateAsync(req.query)
        if (dataFrom === 'body') req.body = await model.validateAsync(req.body)
      } catch (error: any) {
        return res.fail({ status: 400, message: error.message })
      }
      next()
    }
  }

  const superStructValidate = <S>(
    schema: Struct<S>,
    dataFrom: 'query' | 'body',
  ) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (dataFrom === 'query') assert(req.query, schema)
        if (dataFrom === 'body') assert(req.body, schema)
        next()
      } catch (error: any) {
        return res.fail({ status: 400, message: error.message })
      }
    }
  }

  const zodValidate = <S>(schema: zSchema<S>, dataFrom: 'query' | 'body') => {
    return (req: Request, res: Response, next: NextFunction) => {
      let result
      if (dataFrom === 'query') result = schema.safeParse(req.query)
      else if (dataFrom === 'body') result = schema.safeParse(req.body)
      if (!result) return res.fail({ status: 500 })
      if (!result.success) {
        const formattedError = result.error.format()
        return res.fail({ status: 400, message: formattedError })
      }

      if (dataFrom === 'query') req.query = result.data as any
      else if (dataFrom === 'body') req.body = result.data

      next()
    }
  }

  return {
    joiValidate,
    superStructValidate,
    zodValidate,
  }
}

/**
 * 驗證請求的使用者的 userToken 是否合法
 * @param authDB: deta base
 * @param PRIVATEKEY: string
 */
export const useApiAuthentication = (
  PRIVATEKEY: string,
  getUserFunc: CallableFunction,
) => {
  const apiAuthentication = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const userToken: string | undefined = req.headers.authorization
    if (!userToken) return res.fail({ status: 401 })
    try {
      // jwt 解碼 user token 得到 user
      const decodeRes: any = verify(userToken, PRIVATEKEY)
      // 查詢是否存在 user
      // const existUser = await authDB.get(decodeRes.user.id)
      const existUser = await getUserFunc(decodeRes.user.id)
      if (!existUser) return res.fail({ status: 401 })
      if (existUser) req.user = existUser
    } catch (error) {
      console.log(error)
      return res.fail({ status: 500 })
    }
    next()
  }

  return apiAuthentication
}

export const usePermissionsVerify = (
  reqPermissions: string[],
  rules: 'match' | 'contain',
) => {
  const permissionsVerify = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const user = req.user
    if (!user) return res.fail({ status: 401 })
    // match all permissions mode
    if (rules === 'match') {
      const match = user.permissions.filter((permit: string) =>
        reqPermissions.includes(permit),
      )
      if (match.length !== reqPermissions.length)
        return res.fail({ status: 403 })
    }
    // TODO contain permissions mode
    next()
  }

  return permissionsVerify
}
