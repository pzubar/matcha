import { Injectable } from '@nestjs/common'
import MessageModel from './model/message'
import UserModel from '../users/model'

@Injectable()
export class MessagesService {
  constructor(
    private messageModel: MessageModel,
    private userModel: UserModel
  ) {}

  async sendMessage(message: string, senderId: number, receiverId: number) {
    return this.messageModel.insert([
      {
        message,
        senderId,
        receiverId
      }
    ])
  }
}
