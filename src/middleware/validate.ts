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
  dataFrom: 'query' | 'body'
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (dataFrom === 'query') req.query = await model.validateAsync(req.query)
      else if (dataFrom === 'body')
        req.query = await model.validateAsync(req.body)
    } catch (error: any) {
      res.status(400).send(error.message)
      return
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
    next: NextFunction
  ) => {
    const userToken: string | undefined = req.headers.authorization
    if (!userToken) return res.status(401).send('unauthorized')
    if (userToken) {
      try {
        // jwt 解碼 user token 得到 user
        const decodeRes: any = verify(userToken, PRIVATEKEY)
        // 查詢是否存在 user
        const existUser = await authDB.fetch({ id: decodeRes.user.id })
        if (!existUser.count) return res.status(401).send('forbidden')
        // TODO 合法 user -> 判斷user權限
      } catch (error) {
        return res.status(401).send('internal server error')
      }
    }
    next()
  }

  return apiAuthentication
}
