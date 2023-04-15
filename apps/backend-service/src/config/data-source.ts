import * as mysql from 'mysql2/promise'

export class DataSource {
  static poll: mysql.Pool

  static initialize(): void {
    if (!this.poll)
      this.poll = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      })
  }
}
