import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import UserModel from './model'
import { DatabaseModule } from '../db/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [UserModel, UsersService, UsersResolver],
  exports: [UsersService, UserModel]
})
export class UsersModule {}
