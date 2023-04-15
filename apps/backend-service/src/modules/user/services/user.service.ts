import { EntityGetByIdDto } from '../../../common/dtos/entity-get-by-id-dto'
import { badRequest, databaseError, notFoundError } from '../../../common/error'
import logger from '../../../common/logger/logger'
import { UserCreateDto, UserDto, UserFilterDto } from '../dtos/user.dto'
import { UserRepository } from '../repositories/user.repository'

export class UserService {
  static async createUser(userCreateDto: UserCreateDto): Promise<void> {
    try {
      await UserRepository.createUser(userCreateDto)
    } catch (error) {
      logger.error(error.message)
      if (error.message.includes('Duplicate entry')) throw badRequest(`Duplicate entry for ${userCreateDto.email}`)
      throw databaseError('Error to createUser')
    }
  }

  static async getUsers(): Promise<UserDto[]> {
    try {
      const users = await UserRepository.getUsers()
      users.forEach((user) => {
        delete user.password
      })
      return users
    } catch (error) {
      logger.error(error.message)
      throw databaseError('Error to getUsers')
    }
  }

  static async getUserById(filters: EntityGetByIdDto): Promise<UserDto> {
    let user: UserDto
    try {
      user = (await UserRepository.getUsersById(filters))[0]
    } catch (error) {
      logger.error(error.message)
      throw databaseError('Error to getUserById')
    }
    if (!user) throw notFoundError('User not found')
    return user
  }

  static async getUserByEmail(filters: UserFilterDto): Promise<UserDto> {
    let user: UserDto
    try {
      user = (await UserRepository.getUsersByEmail(filters))[0]
    } catch (error) {
      logger.error(error.message)
      throw databaseError('Error to getUserByEmail')
    }
    if (!user) throw notFoundError('User not found')
    return user
  }
}
