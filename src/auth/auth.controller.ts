import { Controller, Post, Body, Req, UseGuards, Request } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user-dto'
import { AuthService } from './auth.service'
import * as requestIp from 'request-ip'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async create(@Body() createUserDto: CreateUserDto, @Req() request) {
    return this.authService.createUser(createUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    console.log('REQ ::: ', req)
    return this.authService.login(req.user)
  }
}
