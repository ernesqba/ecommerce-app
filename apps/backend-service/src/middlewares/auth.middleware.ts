/* eslint-disable dot-notation */
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { unauthorizedError } from '../common/error'
import { UserDto } from '../modules/user/dtos/user.dto'
import { UserService } from '../modules/user/services/user.service'

const authMiddleware = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization').split('Bearer ')[1]
    jwt.verify(token, process.env.SECRET, { ignoreExpiration: true })
    const { email } = jwt.decode(token) as { email: string }
    let user: UserDto = null
    try {
      user = await UserService.getUserByEmail({ email })
    } catch {}
    if (!user) throw unauthorizedError('User not found in database')
    ;(req as any).user = user
    next()
  } catch (error) {
    next(error)
  }
}

export default authMiddleware
