import { Model } from '@shared/model'
import { Inject } from '@nestjs/common'
import { DATABASE_CONNECTION } from '@shared/constants'
import { Database } from '@db'
import { Message } from './message.object-type'
import * as snakecaseKeys from 'snakecase-keys'

class MessageModel extends Model<Message> {
  constructor(@Inject(DATABASE_CONNECTION) database: Database<Message>) {
    super(database, 'messages')
  }

  async getConversation(senderId, receiverId, lastId) {
    return this.database(this.table)
      .where('id', '>', lastId)
      .andWhere(function() {
        this.where(snakecaseKeys({ senderId, receiverId })).orWhere(
          snakecaseKeys({
            senderId: receiverId,
            receiverId: senderId
          })
        )
      })
    // eslint-disable-next-line func-names
    // .andWhereRaw(
    //   `(sender_id = :senderId AND receiver_id = :receiverId) OR (receiver_id = :senderId AND sender_id = :receiverId)`,
    //   { senderId, receiverId }
    // )
  }
}

export default MessageModel
