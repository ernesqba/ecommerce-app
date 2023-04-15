import { NextFunction, Request, Response } from 'express'

import { AuthService } from '../services/auth.service'

export class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      await AuthService.signUp(req.body)
      return res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }

  static async logIn(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const data = await AuthService.logIn(req.body)
      return res.status(200).send(data)
    } catch (error) {
      next(error)
    }
  }
}
