import { EntityGetByIdDto } from '../../../common/dtos/entity-get-by-id-dto'
import { badRequest, databaseError, notFoundError } from '../../../common/error'
import logger from '../../../common/logger/logger'
import { ProductCreateDto, ProductDto, ProductFilterDto, PurchasedProductListDto } from '../dtos/product.dto'
import { ProductRepository } from '../repositories/product.repository'

export class ProductService {
  static async purchasedProducts(purchasedProductListDto: PurchasedProductListDto): Promise<void> {
    try {
      const noValidPurchased: { id: number; reason: string }[] = []
      await Promise.all(
        purchasedProductListDto.list.map(async (purchasedProduct) => {
          const product = await this.getProductById({ id: purchasedProduct.id })
          if (product.stock < purchasedProduct.purchasedStock)
            noValidPurchased.push({
              id: product.id,
              reason: `Product: ${product.name} only has ${product.stock} of stock`,
            })
        }),
      )
      if (noValidPurchased.length) {
        let message = 'This products do not have enought stock: '
        noValidPurchased.forEach((product) => {
          message += `\n${product.reason}`
        })
        throw badRequest(message)
      }
      await Promise.all(
        purchasedProductListDto.list.map(async (purchasedProduct) => {
          const product = await this.getProductById({ id: purchasedProduct.id })
          await this.updateProduct({
            id: product.id,
            stock: product.stock - purchasedProduct.purchasedStock,
          })
        }),
      )
    } catch (error) {
      logger.error(error.message)
      if (error.internalCode) throw error
      throw badRequest('Error to buyProducts')
    }
  }

  static async createProduct(productCreateDto: ProductCreateDto): Promise<void> {
    try {
      await ProductRepository.createProduct(productCreateDto)
    } catch (error) {
      logger.error(error.message)
      throw databaseError('Error to createProduct')
    }
  }

  static async getProducts(productFilterDto: ProductFilterDto): Promise<ProductDto[]> {
    try {
      const products = await ProductRepository.getProducts(productFilterDto)
      return products
    } catch (error) {
      logger.error(error.message)
      throw databaseError('Error to getProducts')
    }
  }

  static async getProductById(entityGetByIdDto: EntityGetByIdDto): Promise<ProductDto> {
    let product: ProductDto
    try {
      product = await ProductRepository.getProductById(entityGetByIdDto)
    } catch (error) {
      logger.error(error.message)
      throw databaseError('Error to getProductById')
    }
    if (!product) throw notFoundError('Product not found')
    return product
  }

  static async updateProduct(productDto: ProductDto): Promise<ProductDto> {
    try {
      await ProductRepository.updateProduct(productDto)
      return await this.getProductById(productDto)
    } catch (error) {
      logger.error(error.message)
      throw databaseError('Error to updateProduct')
    }
  }

  static async deleteProduct(entityGetByIdDto: EntityGetByIdDto): Promise<void> {
    try {
      await ProductRepository.deleteProduct(entityGetByIdDto)
    } catch (error) {
      logger.error(error.message)
      throw databaseError('Error to deleteProduct')
    }
  }
}
