import jwt from 'jsonwebtoken'

import { badRequest, unauthorizedError } from '../../../common/error'
import logger from '../../../common/logger/logger'
import { UserService } from '../../user/services/user.service'
import { LogInDto, LogInOutDto, SignUpDto } from '../dtos/auth.dto'

export class AuthService {
  static secret = process.env.SECRET

  private static createToken(payload: string): string {
    return jwt.sign(payload, this.secret)
  }

  static async signUp(signUpDto: SignUpDto): Promise<void> {
    try {
      await UserService.createUser(signUpDto)
    } catch (error) {
      logger.error(error.message)
      if (error.internalCode) throw error
      throw badRequest('Error to signUp')
    }
  }

  static async logIn(logInDto: LogInDto): Promise<LogInOutDto> {
    let user = null
    try {
      user = await UserService.getUserByEmail({ email: logInDto.email })
    } catch {}
    if (!user || user.password !== logInDto.password) throw unauthorizedError('Wrong user or password')

    try {
      const token = this.createToken(JSON.stringify({ email: user.email }))

      return {
        session: {
          token,
        },
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      }
    } catch (error) {
      logger.error(error.message)
      throw badRequest('Error to logIn: ')
    }
  }
}
