/* eslint-disable dot-notation */
import { NextFunction, Request, Response } from 'express'

import { forbiddenError } from '../common/error'
import logger from '../common/logger/logger'
import { RoleEnum } from '../modules/user/dtos/user.dto'

const roleMiddleware =
  (...roles: RoleEnum[]) =>
  async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    try {
      const user = (req as any).user
      if (roles.includes(user.role)) next()
      else throw forbiddenError('No valid role to access to this feature')
    } catch (error) {
      logger.error(error.message)
      next(error)
    }
  }

export default roleMiddleware
