import { Request, Response, NextFunction } from 'express'
import { log } from '../utils/logger'
import dayjs from 'dayjs'

declare global {
  namespace Express {
    export interface Request {
      user: any
    }
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

/**
 * 格式化回應格式
 */
export const resFormat = ({ status, code, message, data }: ResponseFormat) => ({
  status,
  code: code || '',
  message: message || '',
  data,
})

/**
 * res.send 擴充 (ok、fail)
 */
export const sendResponse = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.ok = (data?: any) => {
    res.json(data)
  }

  res.fail = ({ status, code, message }: ErrorResponse) => {
    status = status ?? 500
    if (!message && status === 500) message = 'unknow server internal error'

    res.status(status).json(
      resFormat({
        status,
        code,
        message,
      }),
    )
  }

  next()
}

export const ignoreRequestStrings: Array<string> = [
  'js/',
  'css/',
  'img/',
  'static/',
  '_nuxt',
  'manifest.json',
]

export const routeLog = (req: Request, _res: Response, next: NextFunction) => {
  if (
    ignoreRequestStrings.some((value) => req.originalUrl.includes(value)) ||
    req.method === 'HEAD'
  ) {
    return next()
  }
  const nowTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  log({
    level: 'request',
    message: `${nowTime} ${req.method} ${req.originalUrl}`,
  })
  next()
}

export function disableCaching(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.originalUrl === '/') {
    res.set('Cache-control', 'no-store')
  }

  next()
}
