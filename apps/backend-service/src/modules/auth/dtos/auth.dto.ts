export class SignUpDto {
  email: string
  password: string
}

export class LogInDto extends SignUpDto {}

export class Session {
  token: string
}

export class UserLoggedIn {
  id: number
  email: string
  role: string
}

export class LogInOutDto {
  session: Session
  user: UserLoggedIn
}
