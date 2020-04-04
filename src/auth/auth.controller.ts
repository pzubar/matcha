import { Controller, Post, Body, Req, UseGuards, Request } from '@nestjs/common'
import { SignUpUserData } from './models/sign-up-user-model'
import { AuthService } from './auth.service'
import * as requestIp from 'request-ip'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async create(@Body() createUserDto: SignUpUserData, @Req() request) {
    return this.authService.createUser(createUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
}
