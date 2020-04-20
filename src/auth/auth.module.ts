import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { UsersModule } from '../users/users.module'
import { jwtConstants } from './constants'
import { AuthController } from './auth.controller'
import jwtConfig from './config/jwt.config'
import { JwtStrategy } from './jwt.strategy'
import { AuthResolver } from './auth.resolver'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot({
      load: [jwtConfig]
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthResolver],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
