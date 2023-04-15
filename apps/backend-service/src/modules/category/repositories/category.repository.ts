import { EntityGetByIdDto } from '../../../common/dtos/entity-get-by-id-dto'
import { DataSource } from '../../../config/data-source'
import { CategoryCreateDto, CategoryDto } from '../dtos/category.dto'

export class CategoryRepository {
  static createCategory(categoryCreateDto: CategoryCreateDto): Promise<any> {
    return DataSource.poll.query('INSERT INTO categories (name) VALUES (?)', [categoryCreateDto.name])
  }

  static getCategories(): Promise<CategoryDto[]> {
    return DataSource.poll.query('SELECT * FROM categories').then((data) => data[0] as CategoryDto[])
  }

  static getCategoryById(entityGetByIdDto: EntityGetByIdDto): Promise<CategoryDto> {
    return DataSource.poll
      .query(`SELECT * FROM categories WHERE id = ${entityGetByIdDto.id}`)
      .then((data) => data[0][0] as CategoryDto)
  }

  static updateCategory(categoryDto: CategoryDto): Promise<any> {
    return DataSource.poll.query(`UPDATE categories SET name = '${categoryDto.name}' WHERE id = ${categoryDto.id};`)
  }

  static deleteCategory(entityGetByIdDto: EntityGetByIdDto): Promise<any> {
    return DataSource.poll.query(`DELETE FROM categories WHERE id = ${entityGetByIdDto.id}`)
  }
}
