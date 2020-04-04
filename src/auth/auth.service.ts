import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { SignUpUserData } from './models/sign-up-user-model'
import { query } from '../../db'
import * as bcrypt from 'bcrypt'
import { Either, error } from '../shared/types'

const saltRounds = 10

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async createUser(
    createUserDto: SignUpUserData
  ): Promise<Either<boolean, Error>> {
    const { username, email, password, firstName, lastName } = createUserDto
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)

    if (await this.usersService.checkIfUserAlreadyExists(username, email)) {
      return error(new Error('User with such username or email already exists'))
    }
    await query(
      `
        INSERT INTO users(username, first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4, $5)`,
      [username, firstName, lastName, email, hash]
    )
    return true
  }

  async validateUser(usernameOrEmail: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(usernameOrEmail)
    const result = await bcrypt.compare(pass, user.password)

    if (result) return user
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
