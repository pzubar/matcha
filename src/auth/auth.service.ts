import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { query } from '@db'
import { Either, error, isError } from '@shared/types'
import { UsersService } from '../users/users.service'
import { SignUpUserData } from './models/sign-up-user-model'

const saltRounds = 10

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async createUser(
    createUserDto: SignUpUserData
  ): Promise<Either<string, Error>> {
    const { username, email, password, firstName, lastName } = createUserDto
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)

    if (await this.usersService.checkIfUserAlreadyExists(username, email)) {
      return error(new Error('User with such username or email already exists'))
    }
    const { rows } = await query(
      `
        INSERT INTO users(username, first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`,
      [username, firstName, lastName, email, hash]
    )
    const [{ id }] = rows
    return id
  }

  async validateUser(usernameOrEmail: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({usernameOrEmail})

    if (isError(user) || !(await bcrypt.compare(pass, user.password))) {
      throw new Error('No user with such email or password!')
    }

    return user
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id }

    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
