import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'
import { verify } from 'jsonwebtoken'

/**
 * 驗證請求攜帶的資料是否合法
 * @param model: joi model
 * @param dataFrom: 'query' | 'body'
 */
export const requestDataValidate = (
  model: ObjectSchema,
  dataFrom: 'query' | 'body',
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (dataFrom === 'query') req.query = await model.validateAsync(req.query)
      if (dataFrom === 'body') req.body = await model.validateAsync(req.body)
    } catch (error: any) {
      return res.fail({ status: 400, message: error.message })
    }
    next()
  }
}

/**
 * 驗證請求的使用者的 userToken 是否合法
 * @param authDB: deta base
 * @param PRIVATEKEY: string
 */
export const useApiAuthentication = (authDB: any, PRIVATEKEY: string) => {
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
      const existUser = await authDB.get(decodeRes.user.id)
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
