import { NextFunction, Request, Response } from 'express'

import { ProductService } from '../services/product.service'

export class ProductController {
  static async createProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      await ProductService.createProduct(req.body)
      return res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }

  static async purchasedProducts(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      await ProductService.purchasedProducts(req.body)
      return res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }

  static async getProducts(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const response = await ProductService.getProducts({ categoryId: +(req.query as any).categoryId })
      return res.status(200).send(response)
    } catch (error) {
      next(error)
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const response = await ProductService.updateProduct({ ...req.body, id: +req.params.id })
      return res.status(200).send(response)
    } catch (error) {
      next(error)
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      await ProductService.deleteProduct({ id: +req.params.id })
      return res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}
