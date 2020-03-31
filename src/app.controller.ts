import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { LocalAuthGuard } from './auth/guards/local-auth.guard'
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @Get('/')
  sayHello() {
    return "Hello, world! It's a matcha project!"
  }
}
