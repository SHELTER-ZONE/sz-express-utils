import { Request, Response } from 'express'

export const serviceWrapper = async (
  req: Request,
  res: Response,
  serviceHandler: CallableFunction,
  options?: { logger?: CallableFunction },
) => {
  try {
    await serviceHandler(req, res)
  } catch (error: any) {
    if (options?.logger) await options.logger()
    else console.log(error)
    res.fail({ status: error.status, code: error.code, message: error.message })
  }
}
