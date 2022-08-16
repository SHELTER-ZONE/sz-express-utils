import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'

export const requestDataValidate = (
  model: ObjectSchema,
  dataFrom: 'query' | 'body'
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (dataFrom === 'query') await model.validateAsync(req.query)
      else if (dataFrom === 'body') await model.validateAsync(req.body)
    } catch (error: any) {
      res.status(400).send(error.message)
      return
    }
    next()
  }
}
