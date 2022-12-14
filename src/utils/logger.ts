import Signale, { SignaleBase } from 'signale'
import dayjs from 'dayjs'

export const signale = new Signale.Signale({
  scope: 'WebCrate',
  logLevel: process.env.LOG_LEVEL || 'info',
  types: {
    success: {
      badge: 'â',
      color: 'green',
      label: 'success',
      logLevel: 'debug',
    },
    info: {
      badge: 'âšī¸',
      color: 'blue',
      label: 'info',
      logLevel: 'debug',
    },
    request: {
      badge: 'đĢ',
      color: 'gray',
      label: 'request',
      logLevel: 'debug',
    },
    debug: {
      badge: 'đˇ',
      color: 'cyan',
      label: 'debug',
      logLevel: 'info',
    },
    warn: {
      badge: 'â ī¸',
      color: 'yellow',
      label: 'warn',
      logLevel: 'info',
    },
  },
})

export const log = ({ level, message }: { level: string; message: string }) => {
  if (Reflect.has(signale, level)) {
    const levelSignale: Signale.LoggerFunc = signale[level as keyof SignaleBase]
    levelSignale({
      prefix: `[${dayjs().format('YYYY-MM-DD HH:mm:ss')}]`,
      message: message,
    })
    return
  }
  signale.warn(`Invalid log level: ${level}`)
}
