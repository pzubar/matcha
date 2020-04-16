import Model from '../../shared/model/Model'
import { query } from '../../../db'

interface Message {
  id: number
  message: string
}

export class MessageModel extends Model<Message> {
  constructor(database) {
    super(database, 'message')
  }

  async getConversation(senderId, receiverId, lastId) {
    return query(
      `
       SELECT * FROM messages WHERE id > $1
        AND sender_id = $2
        AND receiver_id = $3
        `,
      [lastId, senderId, receiverId]
    )
  }
}
