import { Module } from '@nestjs/common'
import { DatabaseModule } from '../db/database.module'
import { MessagesResolver } from './messages.resolver'
import { MessagesService } from './messages.service'
import { MessageModel } from './model'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [MessageModel, MessagesResolver, MessagesService]
})
export class MessagesModule {}
