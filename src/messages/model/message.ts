import { Model } from '@shared/model'
import { Message } from './message.object-type'

class MessageModel extends Model<Message> {
  constructor(database) {
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
