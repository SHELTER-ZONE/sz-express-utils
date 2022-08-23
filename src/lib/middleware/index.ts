import { Request, Response, NextFunction } from 'express'

declare global {
  namespace Express {
    export interface Response {
      ok: (data?: any) => void
      fail: ({ status, code, message }: ErrorResponse) => void
    }
  }
}

export interface ResponseFormat {
  status: number
  code?: string
  message?: string
  data?: any
}

export interface ErrorResponse {
  status?: number
  code?: string
  message?: string
}

export const resFormat = ({ status, code, message, data }: ResponseFormat) => ({
  status,
  code: code || '',
  message: message || '',
  data,
})

export const sendResponse = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res.ok = (data?: any) => {
    res.json(
      resFormat({
        status: 200,
        message: 'ok',
        data: data,
      })
    )
  }

  res.fail = ({ status, code, message }: ErrorResponse) => {
    status = status ?? 500
    if (!message && status === 500) message = 'unknow server internal error'

    res.status(status).json(
      resFormat({
        status,
        code,
        message,
      })
    )
  }

  next()
}
