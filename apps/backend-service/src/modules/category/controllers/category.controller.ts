import { NextFunction, Request, Response } from 'express'

import { CategoryService } from '../services/category.service'

export class CategoryController {
  static async createCategory(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      await CategoryService.createCategory(req.body)
      return res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }

  static async getCategories(_: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const response = await CategoryService.getCategories()
      return res.status(200).send(response)
    } catch (error) {
      next(error)
    }
  }

  static async updateCategory(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const response = await CategoryService.updateCategory({ ...req.body, id: +req.params.id })
      return res.status(200).send(response)
    } catch (error) {
      next(error)
    }
  }

  static async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      await CategoryService.deleteCategory({ id: +req.params.id })
      return res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}
