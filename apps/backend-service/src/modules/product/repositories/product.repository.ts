import { EntityGetByIdDto } from '../../../common/dtos/entity-get-by-id-dto'
import { DataSource } from '../../../config/data-source'
import { ProductCreateDto, ProductDto, ProductFilterDto } from '../dtos/product.dto'

export class ProductRepository {
  static createProduct(productCreateDto: ProductCreateDto): Promise<any> {
    return DataSource.poll.query(
      'INSERT INTO products (category_id, name, description, code, image, price, stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        productCreateDto.categoryId,
        productCreateDto.name,
        productCreateDto.description,
        productCreateDto.code,
        productCreateDto.image,
        productCreateDto.price,
        productCreateDto.stock,
      ],
    )
  }

  static getProducts(productFilterDto: ProductFilterDto): Promise<ProductDto[]> {
    let query = 'SELECT id, category_id as categoryId, name, description, code, image, price, stock FROM products '
    if (productFilterDto.categoryId) query += `WHERE category_id = ${productFilterDto.categoryId}`
    return DataSource.poll.query(query).then((data) => data[0] as ProductDto[])
  }

  static getProductById(entityGetByIdDto: EntityGetByIdDto): Promise<ProductDto> {
    return DataSource.poll
      .query(
        `SELECT id, category_id as categoryId, name, description, code, image, price, stock FROM products WHERE id = ${entityGetByIdDto.id}`,
      )
      .then((data) => data[0][0] as ProductDto)
  }

  static updateProduct(productDto: ProductDto): Promise<any> {
    let query = 'UPDATE products SET '
    if (productDto.categoryId !== undefined) query += `category_id = '${productDto.categoryId}', `
    if (productDto.name !== undefined) query += `name = '${productDto.name}', `
    if (productDto.description !== undefined) query += `description = '${productDto.description}', `
    if (productDto.code !== undefined) query += `code = '${productDto.code}', `
    if (productDto.image !== undefined) query += `image = '${productDto.image}', `
    if (productDto.price !== undefined) query += `price = '${productDto.price}', `
    if (productDto.stock !== undefined) query += `stock = '${productDto.stock}', `

    query = query.substring(0, query.length - 2)
    query += ` WHERE id = ${productDto.id};`

    return DataSource.poll.query(query)
  }

  static deleteProduct(entityGetByIdDto: EntityGetByIdDto): Promise<any> {
    return DataSource.poll.query(`DELETE FROM products WHERE id = ${entityGetByIdDto.id}`)
  }
}
