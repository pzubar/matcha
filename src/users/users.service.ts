import { Injectable } from '@nestjs/common'
import { query } from '../../db'
import { QueryResult } from 'pg'

export interface User {
  password: string
  email: string
  username: string
  distance?: number
}

@Injectable()
export class UsersService {
  private readonly users: User[]

  constructor() {}

  async findOne(nameOrEmail: string): Promise<User | undefined> {
    const result = await query(
      `SELECT *
         FROM users
         WHERE email = $1
            OR username = $1
         LIMIT 1`,
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
