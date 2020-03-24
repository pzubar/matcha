import { Controller, Post, Body } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user-dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto)
  }
}
