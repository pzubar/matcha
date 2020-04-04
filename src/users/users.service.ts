import { Injectable } from '@nestjs/common'
import { query } from '../../db'

export type User = any

@Injectable()
export class UsersService {
  private readonly users: User[]

  constructor() {}

  async findOne(nameOrEmail: string): Promise<User | undefined> {
    const result = await query(
      `SELECT * FROM users WHERE email = $1 OR username = $1 LIMIT 1`,
      [nameOrEmail]
    )
    const { rows } = result
    const [user] = rows

    return user
  }

  async checkIfUserAlreadyExists(
    username: string,
    email: string
  ): Promise<boolean> {
    const result = await query(
      `SELECT * FROM users WHERE username = $1 OR email = $2 LIMIT 1`,
      [username, email]
    )

    return !!result?.rows?.length
  }
}
