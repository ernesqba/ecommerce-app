import { EntityGetByIdDto } from '../../../common/dtos/entity-get-by-id-dto'
import { databaseError, notFoundError } from '../../../common/error'
import logger from '../../../common/logger/logger'
import { CategoryCreateDto, CategoryDto } from '../dtos/category.dto'
import { CategoryRepository } from '../repositories/category.repository'

export class CategoryService {
  static async createCategory(categoryCreateDto: CategoryCreateDto): Promise<void> {
    try {
      await CategoryRepository.createCategory(categoryCreateDto)
    } catch (error) {
      logger.error(error.message)
      throw databaseError('Error to createCategory')
    }
  }

  static async getCategories(): Promise<CategoryDto[]> {
    try {
      const categories = await CategoryRepository.getCategories()
      return categories
    } catch (error) {
      logger.error(error.message)
      throw databaseError('Error to getCategories')
    }
  }

  static async getCategoryById(entityGetByIdDto: EntityGetByIdDto): Promise<CategoryDto> {
    let category: CategoryDto
    try {
      category = await CategoryRepository.getCategoryById(entityGetByIdDto)
    } catch (error) {
      logger.error(error.message)
      throw databaseError('Error to getCategoryById')
    }
    if (!category) throw notFoundError('Category not found')
    return category
  }

  static async updateCategory(categoryDto: CategoryDto): Promise<CategoryDto> {
    try {
      await CategoryRepository.updateCategory(categoryDto)
      return await this.getCategoryById(categoryDto)
    } catch (error) {
      logger.error(error.message)
      throw databaseError('Error to updateCategory')
    }
  }

  static async deleteCategory(entityGetByIdDto: EntityGetByIdDto): Promise<void> {
    try {
      await CategoryRepository.deleteCategory(entityGetByIdDto)
    } catch (error) {
      logger.error(error.message)
      throw databaseError('Error to deleteCategory')
    }
  }
}
