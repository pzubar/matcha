import { Injectable } from '@nestjs/common'
import MessageModel from './model/message'

@Injectable()
export class MessagesService {
  constructor(private messageModel: MessageModel) {}

  async sendMessage(message: string, senderId: number, receiverId: number) {
    return this.messageModel
      .insert([
        {
          message,
          senderId,
          receiverId
        }
      ])
      .returning('id')
  }

  async getConversation(userId: number, interlocutorId) {
    return this.messageModel.getConversation(userId, interlocutorId, 1)
  }
}
