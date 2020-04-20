import { Module } from '@nestjs/common'
import { DatabaseModule } from '../db/database.module'

@Module({
  imports: [DatabaseModule]
})
export class MessagesModule {}
