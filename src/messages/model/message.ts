import { Model } from '@shared/model'
import { Inject } from '@nestjs/common'
import { DATABASE_CONNECTION } from '@shared/constants'
import { Database } from '@db'
import { Message } from './message.object-type'

class MessageModel extends Model<Message> {
  constructor(@Inject(DATABASE_CONNECTION) database: Database<Message>) {
    super(database, 'message')
  }

  async getConversation(senderId, receiverId, lastId) {
    return this.database(this.table)
      .where('id', '>', lastId)
      .andWhere({ senderId })
      .andWhere({ receiverId })
      .limit(10)
  }
}

export default MessageModel
