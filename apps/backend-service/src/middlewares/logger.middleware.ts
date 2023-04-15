/* eslint-disable dot-notation */
import { NextFunction, Request, Response } from 'express'

import logger from '../common/logger/logger'

const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.on('finish', () => {
    const text = `${res.statusCode} ${req.method} ${req.originalUrl}`
    if (res.statusCode < 400) logger.verbose(text)
    else if (res.statusCode < 500) logger.warn(text)
    else logger.error(text)
  })
  res.on('close', () => {
    if (res.writableFinished) return
    logger.error(`${res.statusCode} ${req.method} ${req.originalUrl}`)
  })

  next()
}

export default loggerMiddleware
