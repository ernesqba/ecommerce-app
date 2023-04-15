import { DataSource } from '../../../config/data-source'
import { RoleEnum, UserCreateDto, UserDto, UserFilterRepoDto } from '../dtos/user.dto'

export class UserRepository {
  static createUser(user: UserCreateDto): Promise<any> {
    return DataSource.poll.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [
      user.email,
      user.password,
      RoleEnum.USER,
    ])
  }

  static getUsers(): Promise<UserDto[]> {
    return DataSource.poll.query('SELECT * FROM users').then((data) => data[0] as UserDto[])
  }

  static getUsersById(filters: UserFilterRepoDto): Promise<any> {
    return DataSource.poll.query(`SELECT * FROM users WHERE id = ${filters.id}`).then((data) => data[0] as UserDto[])
  }

  static getUsersByEmail(filters: UserFilterRepoDto): Promise<any> {
    return DataSource.poll
      .query(`SELECT * FROM users WHERE email = '${filters.email}'`)
      .then((data) => data[0] as UserDto[])
  }
}
