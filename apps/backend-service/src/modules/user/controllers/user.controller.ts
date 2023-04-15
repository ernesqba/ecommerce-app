import { NextFunction, Request, Response } from 'express'

import { UserService } from '../services/user.service'

export class UserController {
  static async getUsers(_: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const response = await UserService.getUsers()
      return res.status(200).send(response)
    } catch (error) {
      next(error)
    }
  }
}
