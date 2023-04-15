export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export class UserCreateDto {
  email: string
  password: string
}

export class UserDto extends UserCreateDto {
  id: number
  role: RoleEnum
}

export class UserFilterDto {
  email?: string
  role?: RoleEnum
}

export class UserFilterRepoDto extends UserFilterDto {
  id?: number
}
