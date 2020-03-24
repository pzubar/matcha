import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from './dto/create-user-dto'
import { query } from '../../db'
import * as bcrypt from 'bcrypt'

const saltRounds = 10

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { username, email, password, firstName, lastName } = createUserDto
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)

    const id = await query(
      `
        INSERT INTO users(username, first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`,
      [username, firstName, lastName, email, hash]
    )
    return id
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)
    if (user && user.password === pass) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
