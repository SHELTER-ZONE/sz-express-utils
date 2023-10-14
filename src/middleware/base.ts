import { Request, Response, NextFunction } from 'express'
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
  message?: any
  data?: any
}

export interface ErrorResponse {
  status?: number
  code?: string
  message?: any
}

const getDurationInMilliseconds = (start: [number, number]) => {
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start)

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

/**
 * 格式化回應格式
 */
export const resFormat = ({ status, code, message, data }: ResponseFormat) => ({
  status,
  code: code || null,
  message: message || null,
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

  res.fail = ({ status, code, message }: ErrorResponse): void => {
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

  const baseLog = `${req.method} ${req.originalUrl} - [${req.ip}]`
  console.log(`${baseLog}[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] [STARTED]`)

  const start = process.hrtime()

  _res.on('finish', () => {
    const durationInMilliseconds = getDurationInMilliseconds(start)
    console.log(
      `${baseLog}[FINISHED] ${durationInMilliseconds.toLocaleString()} ms`,
    )
  })

  _res.on('close', () => {
    const durationInMilliseconds = getDurationInMilliseconds(start)
    console.log(
      `${baseLog} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`,
    )
    console.log('-----------------------------------------------------------')
  })

  if (req.body) console.log('body', req.body)
  if (req.query) console.log('query', req.query)
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
