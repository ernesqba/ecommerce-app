import { NextFunction, Request, Response } from 'express'

import * as errors from '../common/error'
import logger from '../common/logger/logger'

const DEFAULT_STATUS_CODE = 500

const statusCodes = {
  [errors.BAD_REQUEST]: 400,
  [errors.UNAUTHORIZED_ERROR]: 401,
  [errors.FORBIDDEN_ERROR]: 403,
  [errors.NOT_FOUND_ERROR]: 404,
  [errors.DATABASE_ERROR]: 503,
}

export const handle = (error: Record<string, any>, _: Request, res: Response, next: NextFunction): Response | void => {
  if (error.internalCode) res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE)
  else {
    // Unrecognized error
    res.status(DEFAULT_STATUS_CODE)
    return next(error)
  }
  logger.error(error.message)
  return res.send({ message: error.message, internal_code: error.internalCode })
}
