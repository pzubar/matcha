import { Injectable } from '@nestjs/common'
import { QueryResult } from 'pg'
import { query } from '@db'
import { Either } from '@shared/types'
import UserModel, { User } from './model'

@Injectable()
export class UsersService {
  constructor(private userModel: UserModel) {}

  async findOne(
    arg: number | { usernameOrEmail?: string }
  ): Promise<Either<User, Error>> {
    try {
      return await (typeof arg === 'number'
        ? this.userModel.findById(arg)
        : this.userModel.findByUserNameOrEmail(arg.usernameOrEmail))
    } catch (e) {
      return e
    }
  }

  async getMessages(userId: number, cursor?: number) {
    try {
      return await this.userModel.getMessages(userId, cursor)
    } catch (e) {
      return e
    }
  }

  async checkIfUserAlreadyExists(
    username: string,
    email: string
  ): Promise<boolean> {
    const result = await query(
      `SELECT *
         FROM users
         WHERE username = $1
            OR email = $2
         LIMIT 1`,
      [username, email]
    )

    return !!result?.rows?.length
  }

  // In spatial databases spatial coordinates are in x = longitude, and y = latitude.
  async updateUserLocation(
    userId: string,
    long: number,
    lat: number
  ): Promise<QueryResult> {
    return query(
      `
                UPDATE users
                SET location='POINT(' || $1 || ', ' || $2 || ')'::geography
                WHERE id = $3
      `,
      [userId, long, lat]
    )
  }

  async getNearestUsers(userId, limit = 50): Promise<Array<User>> {
    const result = await query(
      `
                SELECT first_name,
                       ST_Distance(
                               location,
                               (SELECT location FROM users WHERE id = $1)
                           ) AS distance
                FROM users
                ORDER BY distance
                LIMIT $2;
      `,
      [userId, limit]
    )
    const { rows } = result
    return rows
  }
}
