import { Controller, Post, Body, Req, UseGuards, Request } from '@nestjs/common'
import { CreateUserDto } from './models/create-user-dto'
import { AuthService } from './auth.service'
import * as requestIp from 'request-ip'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async create(@Body() createUserDto: CreateUserDto, @Req() request) {
    return this.authService.createUser(createUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
}
