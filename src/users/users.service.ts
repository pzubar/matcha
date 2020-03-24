import { Injectable } from '@nestjs/common'
import { query } from '../../db'

export type User = any

@Injectable()
export class UsersService {
  private readonly users: User[]

  constructor() {}

  async findOne(username: string): Promise<User | undefined> {
    // console.log()
    return query(
      `SELECT * FROM users WHERE email = $1 LIMIT 1`, [username]
    )
  }
}
